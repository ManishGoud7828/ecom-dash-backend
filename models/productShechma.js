const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    product: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true,
        
    },
    
    photo: {
        type: String,
        required: true
    },
    discription: {
        type: String,
        required: true
    },
   
});

const products = new mongoose.model("products",userSchema);


module.exports = products;