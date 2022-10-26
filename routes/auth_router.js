const {Router}= require('express')
const router = Router()
const config = require('config')

// /auth/register
// router.post('/register', async (req, res) =>{
//     try{
        



//     }catch(e){
//         res.status(500).json({message: 'Server error, try again later'})
//     }
// })

// /auth/login
router.post('/login', async (req, res) =>{
    
    try{
        const {username, password} = req.body
        if (!username){
            return res.status(400).json({message: 'username d'})
        }
        const user = config.get(`users.${username}`)


    }catch(e){
        res.status(500).json({message: 'Server error, try again later'})
    }
})

module.exports = router