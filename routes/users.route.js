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
        const hash = bcrypt.hashSync(req.body.pass, 5);
        const user = new UserModel({...req.body,pass:hash});
        await user.save();
        console.log("after register",user)
        res.json({"msg":`${req.body.name} Registered succesfully`})
    } catch (error) {
        res.json({msg:error})
        
    }
})


module.exports = {
    userRouter
}