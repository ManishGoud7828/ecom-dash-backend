const express = require("express");
const router = require('express').Router();
const users = require("../models/userShechma");
const products = require("../models/productShechma");






// router.get("/",(req,res)=>{
//     console.log("connect");
// });

// register user

router.post("/register",async(req,res)=>{
    // console.log(req.body);
    const {name,email,password} = req.body;

    if(!name || !email || !password){
        res.status(422).json("plz fill the data");
    }

    try {
        
        const preuser = await users.findOne({email:email});
        console.log(preuser);

        if(preuser){
            res.status(422).json("this is user is already present");
        }else{
            const adduser = new users({
                name,email,password
            });

            await adduser.save();
            res.status(201).json(adduser);
            console.log(adduser);
        }

    } catch (error) {
        res.status(422).json(error);
    }
})



// Login Api

router.post('/login' , async (req, res) => {
    
    try{
      const { email, password } = req.body;
   
      if(!email || !password) {
         return res.status(400).json({error: "plz filled the data"});
      }
       
       const userLogin = await users.findOne({ email: email , password: password });

       console.log(userLogin);

       if (!userLogin) {
    
         res.status(400).json({ error: "user not found" });
         
       } 
        else{
           res.json({ message: "user Login Successfully" });
        }

    }
     catch (err) {
       console.log(err);
     }
    
});




// get userdata

router.get("/getdata",async(req,res)=>{
    try {
        const userdata = await users.find();
        res.status(201).json(userdata)
        console.log(userdata);
    } catch (error) {
        res.status(422).json(error);
    }
})



// get individual user

router.get("/getuser/:id",async(req,res)=>{
    try {
        console.log(req.params);
        const {id} = req.params;

        const userindividual = await users.findById({_id:id});
        console.log(userindividual);
        res.status(201).json(userindividual)

    } catch (error) {
        res.status(422).json(error);
    }
})




// update user data

router.patch("/updateuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const updateduser = await users.findByIdAndUpdate(id,req.body,{
            new:true
        });

        console.log(updateduser);
        res.status(201).json(updateduser);

    } catch (error) {
        res.status(422).json(error);
    }
})





// delete user
router.delete("/deleteuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const deletuser = await users.findByIdAndDelete({_id:id})
        console.log(deletuser);
        res.status(201).json(deletuser);

    } catch (error) {
        res.status(422).json(error);
    }
})



      // product   <--------------------------------------------------------------------> system



// get Product Data 
router.get("/getpro",async(req,res)=>{
    try {
        const prodata = await products.find();
        res.status(201).json(prodata)
        console.log(prodata);
    } catch (error) {
        res.status(422).json(error);
    }
})


// get invidual product

router.get("/getproduct/:id",async(req,res)=>{
    try {
        console.log(req.params);
        const {id} = req.params;

        const proindividual = await products.findById({_id:id});
        console.log(proindividual);
        res.status(201).json(proindividual)

    } catch (error) {
        res.status(422).json(error);
    }
})




// update product data

router.patch("/updateproduct/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const updatedpro = await products.findByIdAndUpdate(id,req.body,{
            new:true
        });

        console.log(updatedpro);
        res.status(201).json(updatedpro);

    } catch (error) {
        res.status(422).json(error);
    }
})



// delete product
router.delete("/deleteproduct/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const deletpro = await products.findByIdAndDelete({_id:id})
        console.log(deletpro);
        res.status(201).json(deletpro);

    } catch (error) {
        res.status(422).json(error);
    }
})






module.exports = router;










