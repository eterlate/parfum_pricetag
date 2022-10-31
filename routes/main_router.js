const {Router}= require('express')
const router = Router()
const config = require('config')
const {sendQuery} = require('../db')
// /auth/register
// router.post('/register', async (req, res) =>{
//     try{
        



//     }catch(e){
//         res.status(500).json({message: 'Server error, try again later'})
//     }
// })

// /find
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

router.post('/items', async (req, res) =>{
    try{
        const {mag_number, doc_number} = req.body
        if (!mag_number && !doc_number){
            return res.status(400).json({message: 'Empty fields'})
        }
        query = "SELECT * from marafettPrice where shopCode = \'" + mag_number + "\' and docNumber = \'" + doc_number + "\'"
        result = await sendQuery(query)

        res.status(200).json({result})
    }catch(e){
        res.status(500).json({message: 'Server error, try again later'})
    }
})

module.exports = router