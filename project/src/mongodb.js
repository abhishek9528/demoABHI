var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/logindemo')
.then(()=>{
    console.log("Database is connect");

}).catch((err)=>{
    console.log(err)
})

let userschema=new  mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    emailid:{
        type:String,
        required:true
    }
});

const data = new mongoose.model("users",userschema);

module.exports = data;




