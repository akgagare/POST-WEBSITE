const mongoose = require("mongoose")

const signupDB = 'mongodb+srv://Shubham:database@cluster0.x0u5yjr.mongodb.net/signup?retryWrites=true&w=majority'
const agentDB = 'mongodb+srv://Shubham:database@cluster0.x0u5yjr.mongodb.net/agentdata?retryWrites=true&w=majority'

mongoose.connect(signupDB).then(()=>{
    console.log("connection successful");
}).catch((err) => console.log("no connection")); 

mongoose.agentdata = mongoose.createConnection(agentDB);
   
module.exports = mongoose;