const express= require("express")
const {BlogModel}=require("../model/blogModel")
const {auth}=require("../middleware/auth.middleware")

const blogRouter=express.Router()

// creating blog

blogRouter.post("/api/blogs",auth,async(req,res)=>{
    try{
        const {username,userID,title,content,category,date}=req.body
        const newBlog=new BlogModel({
            username,userID,title,content,category,date,likes:0,comments:[]
        })
        await newBlog.save()
        res.send({msg:"New blog is added"})
    }catch(err){
        res.send({msg:err})
    }
})


// get all blogs 

blogRouter.get("/api/blogs",auth,async(req,res)=>{
    try {
    const blogs=await BlogModel.find()
    res.status(200).json(blogs)
    } catch (error) {
        res.send({error:error})
    } 
})

// getting by title

blogRouter.get("/api/blogs?title=:tittle",auth,async(req,res)=>{
    try {
        const {title}=req.query
        const blogs=await BlogModel.find({title:{$regs:title,$options:i}})
        res.status(200).json(blogs)
    } catch (err) {
        res.send({"error":err})
    }
})

//  getting by category
blogRouter.get("/api/blogs?category=:category",auth,async(req,res)=>{
    try {
        const {category}=req.query
        console.log(category)
        const blogs=await BlogModel.find({category})
        res.status(200).json(blogs)
    } catch (err) {
        res.send({"error":err})
    }
})

// sort
blogRouter.get("/api/blogs?sort=date&order=asc",auth,async(req,res)=>{
    try {
        const {order}=req.query
        const so=order==="asc"?1:-1
        const blogs=await BlogModel.find().sort({date:so})
        res.status(200).json(blogs)
    } catch (err) {
        res.send({"error":err})
    }
})


// delete
blogRouter.delete("/api/blogs/:id",auth,async(req,res)=>{
    try {
        const {id}=req.params
        await BlogModel.findByIdAndDelete(id)
        res.status(200).send({msg:"deleted successfully"})
    } catch (error) {
        res.send({error:error})
    }
})

// edit
blogRouter.put("/api/blogs/:id",auth,async(req,res)=>{
    try {
        const {id}=req.params
        const {title,content,category,date}=req.body
        const bg = await BlogModel.findByIdAndUpdate(id,{title,content,category,date},{new:true})
        res.status(200).json(bg).send({msg:"updated successfully",})
    } catch (error) {
        res.send({error:error})
    }
})

// like

blogRouter.put("/api/blogs/:id/likes",auth,async(req,res)=>{
    try {
        const {id}=req.params
        const bg = await BlogModel.findByIdAndUpdate(id,{$inc:{likes:1}},{new:true})
        res.status(200).json(bg)
    } catch (error) {
        res.send({error:error})
    }
})

// comments

blogRouter.put("/api/blogs/:id/comments",auth,async(req,res)=>{
    try {
        const {id}=req.params
        const {username,content}=req.body
        const bg = await BlogModel.findByIdAndUpdate(id,{$push:{comments:{username,content}}},{new:true})
        res.status(200).json(bg)
    } catch (error) {
        res.send({error:error})
    }
})


module.exports={
    blogRouter
}