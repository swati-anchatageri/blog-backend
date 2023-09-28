const mongoose=require("mongoose")
require("dotenv").config()
const connction=mongoose.connect(process.env.MongoURL)

module.exports={
    connction
}