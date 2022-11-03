const {Router}= require('express')
const router = Router()
const config = require('config')
const {sendQuery} = require('../db')
const {formatDate, formatPrice, percent} = require('../format_functions')

// /find/mag
router.post('/mag', async (req, res) =>{
    try{
        const {mag_number} = req.body
        
        if (!mag_number){
            return res.status(400).json({message: 'Empty number'})
        }
        query = "SELECT distinct docNumber from marafettPrice where shopCode = \'" + mag_number + "\' order by docNumber"
        result = await sendQuery(query)

        res.status(200).json({result})
    }catch(e){
        res.status(500).json({message: 'Server error, try again later'})
    }
})

// /find/items
router.post('/items', async (req, res) =>{
    try{
        const {mag_number, doc_number} = req.body
        if (!mag_number && !doc_number){
            return res.status(400).json({message: 'Empty fields'})
        }
        query = "SELECT * from marafettPrice where shopCode = \'" + mag_number + "\' and docNumber = \'" + doc_number + "\'"
        result = await sendQuery(query)
        result.recordset.forEach(el=>{
            el.oldPrice = 555.00
            el.percent = percent(el.oldPrice, el.itemPrice)
            
            if(el.docDate != null){
                el.docDate = formatDate(el.docDate)
            }
            if(el.itemPrice != null){
                el.itemPrice = formatPrice(el.itemPrice)
            }
            el.oldPrice = formatPrice(555.00)
        })
        res.status(200).json({result})
    }catch(e){
        res.status(500).json({message: 'Server error, try again later'})
    }
})

module.exports = router