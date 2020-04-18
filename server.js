const express = require('express');
const app = express();const port = 8000;

const db = require('./config/mongoose');
const passport = require('passport');
const passportJWT = require('./config/passport-JWT');

app.use(express.urlencoded());
app.use(passport.initialize());
app.use(passport.session());

app.use('/',require('./routes/API/v1/home'));
 

app.listen(port,function(error){
    if(error) {
        console.log(`Error in running server ${error}`);
        return;
    }
    console.log(`Server is running on port ${port}`);
});