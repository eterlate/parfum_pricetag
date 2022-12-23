const { Router } = require('express')
const router = Router()
const { sendQuery } = require('../db')
const { formatDate, formatPrice, percent, headerCheck } = require('../format_functions')
const fs = require('fs')
var axios = require('axios')

// /find/mag
router.post('/mag', async (req, res) => {
    try {
        const { mag_number } = req.body
        const now = new Date

        if (!mag_number) {
            return res.status(400).json({ message: 'Empty number' })
        }
        fs.appendFile('logges.txt', '\n' + 'Запрос по номеру магазина. Номер магазина : ' + req.body.mag_number + ', дата: ' + formatDate(now), () => {
            console.log('Запрос по номеру магазина записан в файл, дата: ', formatDate(now))
        })
        query = "SELECT distinct docNumber, shopCode from marafettPrice where shopCode = \'" + mag_number + "\' order by docNumber desc"
        result = await sendQuery(query)
        result.recordset.forEach(el => {
            if (headerCheck(el.docNumber) != undefined) {
                el.headers = headerCheck(el.docNumber)
            }
        })

        res.status(200).json({ result })
    } catch (e) {
        res.status(500).json({ message: 'Server error, try again later' })
    }
})

// /find/items
router.post('/items', async (req, res) => {
    try {
        const { mag_number, doc_number } = req.body
        const now = new Date

        headers = headerCheck(doc_number)
        if (!mag_number || !doc_number) {
            return res.status(400).json({ message: 'Empty fields' })
        }
        fs.appendFile('logges.txt', '\n' + 'Запрос по номеру магазина и документа. Номер магазина : ' + req.body.mag_number + ', номер документа:  ' + req.body.doc_number + ', дата: ' + formatDate(now), () => {
            console.log('Запрос по номеру магазина и документа записан в файл, дата: ', formatDate(now))
        })
        query = "select distinct itemCode, itemPrice, ПодКатегория, itemName, itemPriceOld from _vwMarafettPricePrint where shopCode like '" + mag_number + "' and docNumber like '%" + doc_number + "' order by ПодКатегория, itemName"
        result = await sendQuery(query)
        result.recordset.forEach(el => {
            el.percent = percent(el.itemPriceOld, el.itemPrice)
            el.docDate = new Date
            el.docDate = formatDate(el.docDate)

            if (el.itemPrice != null) {
                el.itemPrice = formatPrice(el.itemPrice)
            }
            if (el.itemPriceOld != null) {
                el.itemPriceOld = formatPrice(el.itemPriceOld)
            }
        })

        res.status(200).json({ result, headers })
    } catch (e) {
        res.status(500).json({ message: 'Server error, try again later' })
    }
})

//find/barcode
router.post('/barcode', async (req, res) => {
    try {
        const { mag, barcode, curr_date, prev_date } = req.body

        const validMag = (mag) => {
            switch(mag.length){
                case 1:
                    mag = 'М00' + mag
                    return mag
                case 2:
                    mag = 'М0' + mag
                    return mag
                case 3:
                    mag = 'М' + mag
                    return mag
            }
        }
        var data = JSON.stringify({
            "barcode": barcode,
            "mag":  validMag(mag),
            "curr_date": curr_date,
            "prev_date": prev_date
        });

        var config = {
            method: 'post',
            url: 'https://pip3.parfum-lider.ru/api/v1/parfum/getPriceComparing',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        const objectPrepare = (responce) => {
            let docDate = new Date
            let toClient = {
                itemCode: responce.barcode,
                itemName: responce.title,
                stock: responce.stock,
                tag_color_new: responce.tag_color_new,
                tag_color_old: responce.tag_color_old,
                tag_state: responce.tag_state,
                price_state: responce.price_state,
                docDate: formatDate(docDate),
                percent: ''
            }
            if (responce.price_old != undefined && responce.price_new != undefined){
                toClient.itemPriceOld = formatPrice(responce.price_old)
                toClient.itemPrice = formatPrice(responce.price_new)
                toClient.percent = percent(responce.price_old, responce.price_new)
            }
            return toClient
        }

        axios(config)
            .then(function (response) {
                if (response.data[0].data == 'Магазин не найден'){
                    res.status(200).json(response.data[0].data);
                    return
                }
                if (response.data[0].data == 'Номенклатура не найдена'){
                    res.status(200).json(response.data[0].data);
                    return
                }
                res.status(200).json(objectPrepare(response.data[0].data));
            })
            .catch(function (error) {
                console.log(error);
            });
    } catch(e) {
        res.status(500).json({ message: 'Server error, try again later' })
    }


})

module.exports = router