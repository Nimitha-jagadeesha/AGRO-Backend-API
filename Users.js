const mongoose = require("mongoose");

const FarmerSchema = new mongoose.Schema({
  firstname: String,
  lastname:String,
  email: String,
  password:String,
  phone: String,
  address: String,
  isFarmer: Boolean
});

mongoose.model("user", FarmerSchema);
