const express = require("express");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const { UserModel } = require("../models/users.model")
userRouter.post("/login", async (req,res) => {

    const { name, email, pass } = req.body;
  
    try {
        const user = await UserModel.findOne({ email });
        
        
        if (user) {
            const password = bcrypt.compareSync(pass,user.pass)
        if (password) {
            const token = jwt.sign({ userID: user._id, userName: user.name }, process.env.secret_key, {
                expiresIn:"7d"
            });
            const rToken = jwt.sign({ userID: user._id, userName: user.name }, process.env.secret_key2, {
                expiresIn:"28d"
            });

            res.status(200).json({ "msg": "Logged In successfull", token ,rToken})              
        } else {
            res.status(200).json({"ERROR":"Wrong Credentials !"})
        }
        } else {
            res.status(200).json({"ERROR":"Wrong Credentials !"})
            
       }

    } catch (error) {
        res.status(400).json({msg:error.message})
    }
})

userRouter.post("/register",async (req,res) => {
     
    try {
        
        bcrypt.hash(req.body.pass, 5, async (err,hash) => {
            if (err) {
                res.json({"error":"Incorrect format of credentials"})
            } else {
                
                const user = new UserModel({...req.body,pass:hash});
                await user.save();
                res.json({"msg":`${req.body.name} Registered succesfully`})
            }
        });
    } catch (error) {
        res.json({msg:error})
        
    }
})


module.exports = {
    userRouter
}