const mongoose = require("mongoose");
mongoose.set('strictQuery', true);


const connect = mongoose
  .connect(process.env.DATABASE)
  .then((res) => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(`Database connection error: ${err}`);
  });


  module.exports = connect;
 
