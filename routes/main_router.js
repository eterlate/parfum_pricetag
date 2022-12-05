const {Router}= require('express')
const router = Router()
const {sendQuery} = require('../db')
const {formatDate, formatPrice, percent, headerCheck} = require('../format_functions')
const fs = require('fs')

// /find/mag
router.post('/mag', async (req, res) =>{
    try{
        const {mag_number} = req.body
        const now = new Date
        
        if (!mag_number){
            return res.status(400).json({message: 'Empty number'})
        }
        fs.appendFile('logges.txt', '\n' + 'Запрос по номеру магазина. Номер магазина : ' + req.body.mag_number + ', дата: '+ formatDate(now), ()=> {
            console.log('Запрос по номеру магазина записан в файл, дата: ', formatDate(now))
        })
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
        const {mag_number, doc_number} = req.body
        const now = new Date

        headers = headerCheck(doc_number)
        if (!mag_number || !doc_number){
            return res.status(400).json({message: 'Empty fields'})
        }
        fs.appendFile('logges.txt', '\n' + 'Запрос по номеру магазина и документа. Номер магазина : ' + req.body.mag_number + ', номер документа:  ' + req.body.doc_number + ', дата: '+ formatDate(now), ()=> {
            console.log('Запрос по номеру магазина и документа записан в файл, дата: ', formatDate(now))
        })
        query = "select distinct itemCode, itemPrice, ПодКатегория, itemName, itemPriceOld from _vwMarafettPricePrint where shopCode like '"+mag_number+"' and docNumber like '%"+doc_number+"' order by ПодКатегория, itemName"
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