const express = require("express")
const connction = require("./db")
const {userRouter}=require("./routes/userRoute")
const {blogRouter}=require("./routes/blogRoute")
const cors = require("cors")

const app= express()
app.use(express.json())

app.use(cors())
app.use("/users",userRouter)
app.use("/blogs",blogRouter)
app.listen(8080,async()=>{
    try{
        await connction
        console.log("Connected to db and running at port 8080")
    }catch(err){
        console.log(err)
    }
})