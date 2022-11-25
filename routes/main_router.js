const {Router}= require('express')
const router = Router()
const {sendQuery} = require('../db')
const {formatDate, formatPrice, percent, headerCheck} = require('../format_functions')

// /find/mag
router.post('/mag', async (req, res) =>{
    try{
        const {mag_number} = req.body
        
        if (!mag_number){
            return res.status(400).json({message: 'Empty number'})
        }
        query = "SELECT distinct docNumber, shopCode from marafettPrice where shopCode = \'" + mag_number + "\' order by docNumber desc"
        result = await sendQuery(query)
        result.recordset.forEach(el=>{
            if(headerCheck(el.docNumber) != undefined){
                el.headers = headerCheck(el.docNumber)
            }
            
        })

        res.status(200).json({result})
    }catch(e){
        res.status(500).json({message: 'Server error, try again later'})
    }
})

// /find/items
router.post('/items', async (req, res) =>{
    try{
        //select distinct itemCode, itemPrice, ПодКатегория, itemName, docDate, itemPriceOld from _vwMarafettPricePrint where shopCode like '"+shopCode+"' and docNumber like '%"+docNumber+"' order by ПодКатегория, itemName"
        const {mag_number, doc_number} = req.body
        headers = headerCheck(doc_number)
        if (!mag_number || !doc_number){
            return res.status(400).json({message: 'Empty fields'})
        }
        query = "select distinct itemCode, itemPrice, ПодКатегория, itemName, itemPriceOld from _vwMarafettPricePrint where shopCode like '"+mag_number+"' and docNumber like '%"+doc_number+"' order by ПодКатегория, itemName"
        // query = "SELECT * from marafettPrice where shopCode = \'" + mag_number + "\' and docNumber = \'" + doc_number + "\'"
        result = await sendQuery(query)
        docDate = new Date
        
        result.recordset.forEach(el=>{
            el.percent = percent(el.itemPriceOld, el.itemPrice)
            el.docDate = new Date
            el.docDate = formatDate(el.docDate)
            
            if(el.itemPrice != null){
                el.itemPrice = formatPrice(el.itemPrice)
            }
            if(el.itemPriceOld != null){
                el.itemPriceOld = formatPrice(el.itemPriceOld)
            }
        })
        res.status(200).json({result, headers})
    }catch(e){
        res.status(500).json({message: 'Server error, try again later'})
    }
})

module.exports = router