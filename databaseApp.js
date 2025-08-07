const express = require('express');
const session = require('express-session');
const MongoStore= require('connect-mongo');
const mongoose=require('mongoose');
const app=express();
const port =3000;

mongoose.connect('mongodb://127.0.0.1:27017/authDemo')
  .then(() => {
    console.log('MongoDB connected successfully.');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

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

const authRoutes=require("./routes/auth")
app.use('/',authRoutes )

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});