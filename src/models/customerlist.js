const mongoose=require("mongoose");
// const User=require("./customerschema")

const conn = require("../db/conn")
const PostSchema=new mongoose.Schema({
    agent_id:{
     type:mongoose.Schema.Types.ObjectId
    },
    User:{
     type:String,
     required:true
    },
    Scheme_name:{
     type:String,
     required:true
    
    },  
    opening_date:{
        type:Date,
        required:true
        
       },
    closing_date:{
        type:Date,
        required:true

       },

    amount_invested:{
        type:Number,
        required:true
       },
    maturity_amount:{
        type:Number,
        required:true
       }
})
var Post=conn.agentdata.model('Customerlist3',PostSchema);

module.exports={Post,
    deleteData:function(deleteId,callback){
        userdata=Post.findByIdAndDelete(deleteId);
        userdata.exec(function(err,data)
        {
            if(err) throw err;
            return callback(data);
        })
    }
}