const express = require('express');
const session = require('express-session');
const MongoStore= require('connect-mongo');
const mongoose=require('mongoose');
const app=express();
const port =3000;

mongoose.connect('mongodb://127.0.0.1:27017/authDemo');
app.set('view engine','ejs');
app.use(express.urlencoded({
    extended: true
}));

app.use(session({
    secret:'secret-key',
    resave: false,
    saveUninitialized:false,
    store:MongoStore.create({mongoUrl: 'mongodb://127.0.0.1:27017/authDemo'})
}));

const authRoutes=require("./auth/routes")
app.use('/',authRoutes )

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});