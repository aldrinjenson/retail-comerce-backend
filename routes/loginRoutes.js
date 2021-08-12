const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Company } = require("../model/Company");


  
  router.post("/", async(req, res) => {
        
        // check if username already exist in db
        
        const companyUser = await Company.findOne({username: req.body.username}); 
        if (!companyUser){
            return res.status(400).send("username does not exist");
        }
        
        const validPassword = await bcrypt.compare(req.body.password, companyUser.password);
        if (!validPassword) return res.status(400).send("invalid password");// check the passfor the username
        const token = jwt.sign({username: companyUser.username},process.env.TOKEN_SECRET);
        res.header('auth-token',token).send(token); // append token as the value for auth-token key in the header

        
        
  });
  
  module.exports.loginRouter = router;
  