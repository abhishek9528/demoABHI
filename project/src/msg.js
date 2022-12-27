var express = require('express');
const app = express();
const hbs = require("hbs");
const bcrypt = require("bcryptjs");
const path = require("path");  
const bodyparser = require('body-parser');

app.set("view engine","hbs");
app.set("views",path.join(__dirname, "../templates/") );


app.get("/",(req,res)=>{
    res.render("message");
})
 
app.listen(8000,()=>{
    console.log("server start")
})
