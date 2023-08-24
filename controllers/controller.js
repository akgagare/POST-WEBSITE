// all the schemas(models)
const Register = require("../src/models/registers"); 
const Customer1 = require("../src/models/customerlist").Post; 
const Customer2 = require("../src/models/customerlist"); 
const Agent = require("../src/models/agent");
const Fallup = require("../src/models/fall_up")
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { deleteData } = require("../src/models/customerlist");


const gethomepage = (req,res)=>{
    res.render("home_pg_post")
};

const getloginpage = (req,res)=>{
    res.render("index")
};

const getschemespage =(req,res)=>{
    res.render("schemes")
};

const getfalluppage =(req,res)=>{
    Fallup.find({_id:req.params.id})

    .then((fc)=>{
        res.render("fallup", {fc});
    }).catch((err)=>{
        console.log(err);
    })
}

const checklogin = async(req,res)=>{
    try{
        const ausername = req.body.ausername;
        const alpassword = req.body.aloginpassword;
        const registerationid = req.body.areg_id;

        // console.log(`${username} and password is ${password}`)

        const usernamecheck = await Agent.findOne({username:ausername});
        // res.send(usernamecheck);
        console.log(usernamecheck);

        if(usernamecheck.password === alpassword && usernamecheck.reg_id === registerationid){
            // res.status(201).send("Data Exists");
            res.status(201).redirect(`/login/agentprofile/${usernamecheck._id}`);
            // console.log(usernamecheck);
        }else{
            res.send("Invalid Login Details");
            console.log("invalid details");
        }
        
        // res.redirect(`/agentprofile/${username}`)
    }catch(error){
        res.status(205).send("Error")
    }
};

const getcustomerloginpage = (req,res)=>{
    res.render("custlogin")
};

const checkcustomerlogin = async(req,res)=>{
    try{
        const cusername = req.body.cusername;
        const cpassword = req.body.cloginpassword;
        // const chashcheck = bcrypt.hashSync(cpassword,12)
        // console.log(`${username} and password is ${password}`)

        const customercheck = await Register.findOne({cusername:cusername});
        // res.send(usernamecheck);
        // console.log(usernamecheck);
        
        // console.log(bcrypt.compareSync(customercheck.cpassword, chashcheck));
        if( customercheck.cpassword === cpassword){
            // res.status(201).send("Data Exists");
            res.status(201).redirect(`/customerlogin/customerprofile/${customercheck.id}`);
            // res.send("data exists");
            // console.log(usernamecheck);
        }else{
            res.send("Invalid Login Details");
            console.log("invalid details");
        }
        
        // res.redirect(`/agentprofile/${username}`)
    }catch(error){
        res.status(205).send("Error")
    }
};



// };

const getcustomerprofilepage = (req,res)=>{

    const customerid = Register.find({_id:req.params.id})

    customerid.exec(function(err,data){
        if(err) throw err;
        res.render("customerprofile",{cust:data});
    });

};

const getagentprofilepage = (req,res)=>{

    Agent.find({_id:req.params.id})
    
    .then((z)=>{
        res.render("agentvalapg", {z})
        // console.log(z);

    }).catch((err)=>{
        console.log(err);
    })

};

const getagentinterfacepage = (req,res)=>{
    // console.log(req.params.id)
    Customer1.find({agent_id:req.params.id})
    .then((x)=>{
        res.render("agentinterface", {x})
        // console.log(path.join(__dirname), "./models/registers.js");
        console.log(x);
    }).catch((err)=>{
        console.log(err)
    })
};

const getcustomerdata = async(req,res,next) =>{
    try{    
            const agentid = req.params.id;
            const customers = new Customer1({
                agent_id:req.params.id,
                User: req.body.name,
                Scheme_name: req.body.schemes,
                opening_date:req.body.opening,
                closing_date:req.body.mature,
                amount_invested:req.body.amount,
                maturity_amount:req.body.maturity_amount
            });
        
         await customers.save();
        // res.send("Successfully created user");
        res.redirect(`/login/agentprofile/${agentid}/agentinterface`)
        


    }catch(error){
        res.status(201).send(error);
    }
};

const getcustomersignuppage = (req,res)=>{
    res.render("customersignup");
};

const getcustomersignupdata = async (req,res) =>{
    try{
    
        const password = req.body.pass;
        const ccpassword = req.body.confirmpass;
        // const hashp = await bcrypt.hashSync(password,12);
        // const hashcp = await bcrypt.hashSync(ccpassword,12);
        // console.log(hashp);
        // console.log(hashcp);
        if(password === ccpassword){
            const registerusers = new Register({
                name: req.body.fullname,
                gender: req.body.gender,
                age: req.body.age,
                email: req.body.email,
                contact: req.body.contact,
                address: req.body.address,
                cpincode: req.body.cpincode,
                cusername: req.body.cusername,
                cpassword: req.body.pass,
                confirmpassword: req.body.confirmpass
            })
        
        const registered = await registerusers.save();
        res.status(202).redirect("/customerlogin");

        }else{
            res.send("password not matched")
        }

    } catch(error){
        res.status(201).send(error);
    }
};

const getagentsignuppage = (req,res)=>{
    res.render("agentsignup");
};

const getagentsignupdata = async (req,res) =>{
    try{
    
        const apassword = req.body.password;
        const acpassword = req.body.aconfirmpassword;
        // const ahashp = await bcrypt.hashSync(apassword,12);
        // const ahashcp = await bcrypt.hashSync(acpassword,12);

        if(apassword === acpassword){
            const registeragents = new Agent({
                agentname: req.body.agentname,
                username: req.body.username,
                password: req.body.password,
                aconfirmpassword: req.body.aconfirmpassword,
                reg_id: req.body.reg_id,
                gender: req.body.gender,
                email: req.body.email,
                contact: req.body.contact,
                aaddress: req.body.aaddress,
                apincode:req.body.apincode,
                post_location:req.body.post_location,
                service:req.body.service,
                schemes_delivered:req.body.schemes_delivered
            });
        
        const registeredagents = await registeragents.save();
        res.status(202).redirect('/login');

        }else{
            res.send("password not matched")
        }

    } catch(error){
        res.status(201).send(error);
        // res.send(window.alert("Please fill all the details"));
    }
};


const getagentlist = async function(req,res){
    const id = req.params.id
    const userdata =  await Register.findOne({_id:id})
    // console.log(userdata)
    const userpincode = userdata.cpincode
    // console.log(userdata.cpincode)
    var relagent = Agent.find({apincode:userpincode});
    // console.log(relagent);

    relagent.exec(function(err,data){
        if(err) throw err;
        res.render("agentlist",{agent:data});
    });
    
};

 

// const funcforagent = function(req,res){
//     console.log(value);
//     res.redirect(`/customerlogin/customerprofile/${id}/agentlist`)
// }



const getcalculator = (req,res)=>{
    res.render("calculator");
}

const deletecustomerdata = (req,res)=>{
    var deleteId = req.params.id;
    console.log(deleteId);
    Customer2.deleteData(deleteId,(data)=>{
        // res.redirect(`/login/agentprofile/${deleteId}/agentinterface`)
        // res.send("Deleted successfully")
        // console.log("record waas deleted");
        return console.log("deleted");
    });
}

// const storefallupdata = async(req,res)=>{
//     try{
//         const Deletedcustomer = await Customer1.findOne({agent_id:req.params.id})
//         console.log(Deletedcustomer)
//         const fupcustomer = new Fallup({
//                 agent_id:Deletedcustomer.agent_id,
//                 User: Deletedcustomer.User,
//                 Scheme_name: Deletedcustomer.Scheme_name,
//                 opening_date: Deletedcustomer.opening_date,
//                 closing_date: Deletedcustomer.closing_date,
//                 amount_invested: Deletedcustomer.amount_invested,
//                 maturity_amount: Deletedcustomer.maturity_amount
//         })

//         const fupcustomers = await fupcustomer.save();
//         res.send.redirect(`/login/agentprofile/${Deletedcustomer.agent_id}/agentinterface`);
//         console.log("saved fallup");

//     }catch(error){
//         res.status(201).send(error);
        
//     }

//     };

module.exports = {getfalluppage,deletecustomerdata,getagentlist, getschemespage, getcalculator, gethomepage, getloginpage,checklogin,getcustomerloginpage,checkcustomerlogin,getagentprofilepage,getagentinterfacepage,getcustomerdata,getcustomersignuppage,getcustomersignupdata,getagentsignuppage,getagentsignupdata,getcustomerprofilepage}
