const express=require('express');
const app=express();
const bcrypt=require('bcrypt');
const router=express.Router();
// const User = require('../models/User');
const user = require('../models/user');
const session = require('express-session');

router.get('/register',(req,res)=>{
    res.render('register')
});

router.post('/register',async (req,res)=>{
    const {username,email,password}=req.body;
    const hashed= await bcrypt.hash(password,12)
await User.create({username,email,password:hashed});
   res.redirect('/login2');
})

router.get('/login2',(req,res)=>{
    res.render('login2')
})

router.post('/login2',async(req,res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({ email });

if (user && await bcrypt.compare(password, user.password)) {
        req.session.user=user
        res.redirect('/dashboard2')
    }
else{
    res.send('Invalid Creadentials !');
}
});

router.get('/dashboard2',(req,res)=>{
    if(!req.session,user){
        return res.redirect('/login2');
    }
    else{
        res.render('dashboard2',{user: req.session.user})
    }
});

router.get('/logout',(req,res)=>{
    req.session.distroy(()=>{
        res.redirect('/login2')
    });
});

module.exports=router