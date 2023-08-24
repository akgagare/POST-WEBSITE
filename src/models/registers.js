const mongoose = require("mongoose");

const signupschema = new mongoose.Schema({
        name:{
        type:String,
        required:true
        },
        gender:{
            type:String,
            required:true
        },
        age:{
            type:Number,
            required:true
        },
        email:{
            type:String,
            required:true
           
        },
        contact:{
            type:Number,
            required:true
           
        },
        address:{
            type:String,
            required:true
        },
        cpincode:{
            type:Number,
            required: true
        },
        cusername:{
            type:String,
            required:true
           
        },
        cpassword:{
            type:String,
            required:true
        },
        confirmpassword:{
            type:String,
            required:true
        }
})

const Register = new mongoose.model("Customerfinal5", signupschema);

module.exports = Register;