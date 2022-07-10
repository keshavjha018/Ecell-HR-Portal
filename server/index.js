//For Production
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({path: __dirname+'/.env'});
}

const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require('cors');
const router = require("./src/routes/Router.js");       //Connecting Router
require("./db/connection.js");                          //Connecting DataBase

require('dotenv').config();
const PORT = process.env.PORT || 8000;

const app = express();

//---------MIDDLEWARES------------
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use('/', router);

//----Serving React App on Production Side ------

if (process.env.NODE_ENV !== 'production') {
    const path = require("path");

    app.get("/", (req,res)=>{
        app.use(express.static(path.resolve(__dirname, "../client", "build" )));
        res.sendFile(path.resolve(__dirname, "../client", "build", "index.html" ));
    })
};

//---------🌐 SERVER 🌐------------

app.listen(PORT, (error) => {
    if(error){
        console.log(error);
    }
    console.log(`---------------------------------------------------`);
    console.log(`🌐  Server is Listening to Port: ${PORT} ✅✅`);
    console.log(`----------------------------------------------------`);
})