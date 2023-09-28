const mongoose = require("mongoose")

const commentSchema = mongoose.Schema({
    content:String,
    username:String
})
const blogSchema=mongoose.Schema({
  username:String,
  title:String,
  content:String,
  userID:String,
  category:{type:String,enum:["Business","Tech","Lifestyle","Entertainment"]},
  date:{
 type:Date,
 default:Date.now
  },
  likes:Number,
  comments:[commentSchema]
},{
    versionKey:false
})

const BlogModel=mongoose.model("blog",blogSchema)

module.exports={
    BlogModel
}