const express = require('express');
const path = require('path');
const passport = require('passport')
const session =  require('express-session');

const {initPassport} = require('./auth')

const app = express();


app.get('/',(req,res)=>{
    res.send("Welcome!")
})

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));
  
app.get('/auth/google/callback', 
passport.authenticate('google', { failureRedirect: '/login' }),
function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
});

app.listen(3000, () => console.log('Server listening at port 8080...'));
