const express = require('express');
const router = express.Router();

const  {getfalluppage,getagentlist, getschemespage, getcalculator,  getcustomerprofilepage,gethomepage, getloginpage,checklogin,getcustomerloginpage,checkcustomerlogin,getagentprofilepage,getagentinterfacepage,getcustomerdata,getcustomersignuppage,getcustomersignupdata,getagentsignuppage,getagentsignupdata, deletecustomerdata}
= require("../controllers/controller")

router.route("/")
    .get(gethomepage);

router.route("/login")
    .get(getloginpage)
    .post(checklogin);

router.route("/customerlogin")
    .get(getcustomerloginpage)
    .post(checkcustomerlogin);

router.route("/customerlogin/customerprofile/:id")
    .get(getcustomerprofilepage);

router.route("/customerlogin/customerprofile/:id/agentlist")
    .get(getagentlist);

router.route("/schemes")
    .get(getschemespage);

router.route("/login/agentprofile/:id")
    .get(getagentprofilepage);

router.route("/precalculator")
    .get(getcalculator);

router.route("/login/agentprofile/:id/agentinterface")
    .get(getagentinterfacepage)
    .post(getcustomerdata);

router.route("/login/agentprofile/:id/fallupcustomers")
    .get(getfalluppage);

router.route("/login/agentprofile/:id/agentinterface/delete")
    .get(deletecustomerdata);

router.route("/customersignup")
    .get(getcustomersignuppage)
    .post(getcustomersignupdata);

router.route("/agentsignup")
    .get(getagentsignuppage)
    .post(getagentsignupdata);

// router.route("/agentlist")
//     .get(funcforagent);

    module.exports = router;