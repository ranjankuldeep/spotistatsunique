const express=require('express');
const authroutes=require('./routes/auth-routes.js');
const passportSetUp=require('./config/passport-config');
require('dotenv').config()
const mongoose=require('mongoose');
const cookieSession = require('cookie-session');
const fs=require('fs');
const passport = require('passport');
const { session } = require('passport');
const queryString=require('querystring')
const baseAdress = process.env.BASEADRESS;
const MONGODB_URI=process.env.MONGODBURL;
const axios =require('axios')
const profileroutes=require('./routes/profile-routes');
const spotifyroutes=require('./routes/spotify-routes');
const { checkPrimeSync } = require('crypto');
const clientID = process.env.CLIENTID;
const clientSecret = process.env.CLIENTSECRET;
const app=express();

app.set('view engine','ejs');

app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys:['jkldnflksklf']
}))

app.use(passport.initialize())
app.use(passport.session());

app.get('/', (req,res)=>{
    res.render('home',{user:req.user});
})

app.use('/auth',authroutes);
app.use(profileroutes);
app.use('/spotify',spotifyroutes);
const PORT = process.env.PORT || 3000;
mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    console.log("connected to the database");
    app.listen(PORT,()=>{
            console.log('App is listening on the port 3000');
        });
  })
  .catch((err) => {
    console.log('herte is the error')
console.log(err);
  });