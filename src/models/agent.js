const mongoose = require('mongoose')

const conn = require("../db/conn")
const agentschema = new mongoose.Schema({
    agentname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    aconfirmpassword:{
        type:String,
        required:true,
        unique:true
    },
    reg_id:{
        type:String,
        required:true,
        unique:true
    },
    gender:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    contact:{
        type:Number,
        required:true,
        unique:true
    },
    aaddress:{
        type:String,
        required:true,
    },
    apincode:{
        type:Number,
        required: true
    },
    post_location:{
        type:String,
        required:true
    },
    service:{
        type:String,
        required:true
    },
    schemes_delivered:{
        type:Array,
        required:true
    }

})

const Agent = conn.agentdata.model("Agentfinal", agentschema);

module.exports = Agent;