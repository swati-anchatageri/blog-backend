const express= require("express")
const {UserModel}=require("../model/userModel")
const bcrypt= require("bcrypt")
const jwt = require("jsonwebtoken")


const userRouter=express.Router()

// user Registration

userRouter.post("/api/register",async(req,res)=>{
    const {email,password}=req.body
    try{
        const existing = await UserModel.findOne({email})
        if(existing){
            res.send({msg:"User Already Exists"})
        }else{
            bcrypt.hash(password,5,async(err,hash)=>{
                if(err){
                    res.send({"Error":err})
                }else{
                    const user = new UserModel({...req.body,password:hash})
                    await user.save()
                    res.send({msg:"new user has been added "})
                }
            })
        }
    }catch(err){
        res.send({error:err})
    }
})

// user Login

userRouter.post("/api/login",async(req,res)=>{
    try {
        const {email,password}=req.body
        const user = await UserModel.findOne({email})
        if(user){
            console.log(user)
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    const token = jwt.sign({userID:user._id,username:user.username},"masai")
                    res.send({msg:"Login Sucessful", token:token})
                }else{
                    res.send({error:err})
                }
            })
        }else{
            res.send({msg:"Wrong credentials"})
        }
    } catch (error) {
        res.send({error:error})
    }
})

module.exports={
    userRouter
}
