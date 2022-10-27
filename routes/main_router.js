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
        console.log(req.body)
        const {mag_number} = req.body
        
        if (!mag_number){
            return res.status(400).json({message: 'enter number'})
        }
        query = "SELECT * from marafettPrice where shopCode = \'" + mag_number + "\'"
        result = await sendQuery(query)
        console.log(result)


    }catch(e){
        res.status(500).json({message: 'Server error, try again later'})
    }
})

module.exports = router