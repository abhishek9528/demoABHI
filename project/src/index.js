var express = require('express');
const app = express();
const hbs = require("hbs");
const bcrypt = require("bcryptjs");
const path = require("path");  
const bodyparser = require('body-parser');
const  collectiondata  = require('./mongodb');
const { urlencoded } = require('body-parser');
const session = require("express-session");
const mongosession = require("connect-mongodb-session")(session);

const mongoURI = "mongodb://127.0.0.1:27017/loginuser";


app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

app.set("view engine","hbs");
app.set("views",path.join(__dirname, "../templates/") );



const store = new mongosession({
    uri: mongoURI,
    collection: 'mysession',
});

app.use(session({
    secret: 'This is Key',
    resave: false,
    saveUninitialized: false,
    store: store
}));


const social = (req,res, next) => {
    if(req.session.social){
        next()
    } else {
        res.redirect('/');
    }
}

app.get("/home",social,(req,res)=>{
    res.render("home");
})
app.get("/",(req,res)=>{
    res.render("login")
});
app.get("/reg",(req,res)=>{
    res.render("reg")
});
app.get("/login", social ,(req,res) => {
    res.render("login");
});
app.post("/logout",(req,res)=>{
    req.session.destroy((err) => {
        if(err) throw err;
        return res.redirect("/");
    })
});

app.post("/signin",async(req,res)=>{
    try {
        const {user,password} = req.body;
        console.log(user,password);
        const check = await collectiondata.findOne({name:user});

        if(bcrypt.compareSync(password,check.password)){
            req.session.social =true;
            res.redirect("/home?=success");
        }
        else{
            return res.redirect("/");
        }
    } catch (error) {
        res.send("WRONG DETAILS");
    }
});
    
app.post("/reg",async (req,res)=>{
    const {user,password} =  req.body;

    let datau = {
        username:user,
        emailid:password
    }
    await collectiondata.insertMany([datau]);     
    res.send("DATA INSERTED");
});

app.listen(4000,()=>{
    console.log("server start")
})