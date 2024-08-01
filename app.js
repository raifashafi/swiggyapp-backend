const mongoose=require("mongoose")
const cors=require("cors")
const express=require("express")
const bcrypt=require("bcrypt")
const loginModel = require("./models/admin")


const app=express()

app.use(cors())//for the connection

app.use(express.json())

mongoose.connect("mongodb+srv://raifashafi:raifashafi@cluster0.tznb7.mongodb.net/admindb?retryWrites=true&w=majority&appName=Cluster0")
app.get("/test",(req,res)=>{

    res.json({"status":"success"})
})
//admin signin username and password 
app.post("/adminSignup",(req,res)=>{
    let input=req.body
    let hashedpassword=bcrypt.hashSync(input.password,10)//for password hashing based on the salt value the encryption will be changed
    //console.log(hashedpassword) printing the hashed password
    input.password=hashedpassword//giving back the hashed password into password
    console.log(input)
    let result=new loginModel(input)
    result.save()
    res.json({"status":"success"})


})

app.listen(3030,()=>{
    console.log("server started")
})

