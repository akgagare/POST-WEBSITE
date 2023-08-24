"use strict";
const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const app = express();  
const ejs = require("ejs"); 
const mongoose = require("mongoose"); 
const port = process.env.PORT || 7000; 
require("./db/conn"); 
const bcrypt =  require("bcrypt")

// path variables for files
const staticpath = path.join(__dirname, "../public") 
const templatespath = path.join(__dirname, "../templates/views") 
// const partialspath = path.join(__dirname, "../templates/partials") 

app.use(express.json()); 
app.use(express.urlencoded({extended:true})); 
app.use(bodyparser.urlencoded({extended:true})); 
 
console.log(staticpath); 
app.use(express.static(staticpath)); //to run the server  
app.set("view engine" ,"ejs"); 
app.set("views", templatespath); 


// routes
const routes = require("../routes/routes");
app.use("/", routes);


app.listen(port, ()=>{
    console.log(`listening at ${port}`);
}); 