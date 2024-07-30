require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("./db/connection");
const users = require("./models/userShechma");
const products = require("./models/productShechma");
const cors = require("cors");
const router = require("./routes/routes");


app.use('/images', express.static('images'));
const multer = require('multer');
let path = require('path');
const { v4: uuidv4 } = require('uuid');



const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());


app.get("/",(req,res)=>{
    res.json("server start")
})





// Product Add System 

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'images');
  },
  filename: function(req, file, cb) {
      cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if(allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
  } else {
      cb(null, false);
  }
}

let upload = multer({ storage, fileFilter });
  


router.route('/add').post(upload.single('photo'), (req, res) => {
  const product = req.body.product;
  const price = req.body.price;
  const discription = req.body.discription;
  const photo = req.file.filename;

  const newUserData = {
    product,
    price,
    discription,
    photo

  }

  const newUser = new products(newUserData);

  newUser.save()
         .then(() => res.json('User Added'))
         .catch(err => res.status(400).json('Error: ' + err));
});
  








app.use(router);

app.listen(port, () => {
    console.log(`server is start port number ${port}`);
});