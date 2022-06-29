const express = require("express");
const router = require("./src/routes/Router.js");       //Connecting Router
require("./db/connection.js");                          //Connecting DataBase

require('dotenv').config();
const PORT = process.env.PORT || 8000;

const app = express();

//---------MIDDLEWARES------------
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', router);


//---------🌐 SERVER 🌐------------

app.listen(PORT, (error) => {
    if(error){
        console.log(error);
    }
    console.log(`---------------------------------------------------`);
    console.log(`🌐  Server is Listening to Port: ${PORT} ✅✅`);
    console.log(`----------------------------------------------------`);
})