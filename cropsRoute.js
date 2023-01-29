const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cropRouter = express.Router();
require("./crops");
const Crops = mongoose.model("crop");

cropRouter.get("/data", (req, res) => {
  Crops.find({})
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      console.log(error.message);
    });
});

cropRouter.post("/send-data", (req, res) => {
  const crop = new Crops({
    name: req.body.name,
    price: req.body.price,
    owner: req.body.owner,
    pic: req.body.pic,
    ownerid: req.body.ownerid,
    owneraddress: req.body.owneraddress,
    ownerphone: req.body.ownerphone
  });
  crop
    .save()
    .then(data => {
      console.log(data);
      res.send(data);
    })
    .catch(err => {
      console.log(err);
    });
});

cropRouter.post("/delete", (req, res) => {
  Crops.findByIdAndRemove(req.body.id)
    .then(data => {
      res.send(data);
      console.log(data);
    })
    .catch(error => {
      console.log(error.message);
    });
});

cropRouter.post("/update", (req, res) => {
  Crops.findByIdAndUpdate(req.body.id, {
    name: req.body.name,
    price: req.body.price,
    owner: req.body.owner,
    ownerId: req.body.ownerId,
    ownerAddress: req.body.ownerAdress,
    ownerPhone: req.body.ownerPhone,
    pic: req.body.pic
  })
    .then(data => {
      console.log(data);
      res.send(data);
    })
    .catch(err => {
      console.log(err);
    });
});