const mongoose = require("mongoose");

const CropsSchema = new mongoose.Schema(
  {
    name: String,
    price: String,
    owner: String,
    pic: String,
    ownerid: String,
    owneraddress: String,
    ownerphone: String
  }
);

mongoose.model("crop", CropsSchema);
