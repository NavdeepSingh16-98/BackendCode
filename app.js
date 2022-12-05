
require('dotenv').config();

require('./config/database').connect()
const express = require('express');

const jwt = require("jsonwebtoken");


const bcrypt = require('bcryptjs');

const User = require('./model/user'); 
const cookieParser = require('cookie-parser');

const auth = require('./middleware/auth')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());


app.get('/',(req,res)=>{



    res.send('welcome to backend');
})


app.post("/register",async (req,res)=>{


    try{


        const {firstname,lastname,email,password} = req.body;

        if(!(email && password && lastname && firstname)){

            req.status(401).send("All files are required")
        }

        const existingUser = await User.findOne({email});

        if(existingUser){

            res.status(401).send("user already found in database");
        }
const myEncyPassword = await bcrypt.hash(password,10);


const user = await User.create({
    firstname,
    lastname,
    email,
    password:myEncyPassword
})

console.log(user);

const token =  jwt.sign({
    id:user._id,email
},'shhhh',{expiresIn:'2h'})

user.token = token
//const newObj = Object.assign({},{...user,token:token})
user.password = undefined;

console.log(user.token);

res.status(201).json(user);

    }catch(err){
console.log(err);
console.log("Error in response route");


    }
})

app.post("/login",async (req,res)=>{
try{

    const {email,password} = req.body;


    if(!(email && password)){

      return  res.status(401).send("email and password are required");
    }

    const user  = await User.findOne({email});

    if(user && (await bcrypt.compare(password,user.password))){

        const token = jwt.sign({id:user._id,email},'shhhh',{expiresIn:'2h'});

        user.password = undefined;
        user.token = token;


        const options = {

            expires:new Date(Date.now() + 3*24*60*60*1000),

            httpOnly:true
        }

     return   res.status(200).cookie("token",token,options).json({

            success:true,
            token,
            user
        })


    }
  return  res.status(400).send("email or password is incorrect");

}catch(err){

        console.log(err);
    }


})

app.get("/dashboard",auth,(req,res)=>{


    res.send('Welcome to dashboard');
})


module.exports = app;