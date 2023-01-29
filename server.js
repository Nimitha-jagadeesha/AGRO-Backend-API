const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const password = "CZ6fZDIui3au9Fly";
const mongoUrl = `mongodb+srv://Nimitha:${password}@cluster0.hacxe.mongodb.net/<dbname>?retryWrites=true&w=majority`;
require("./crops");
require("./Users");
const jwt = require("jsonwebtoken");
app.use(bodyParser.json());
const Crops = mongoose.model("crop");
const User = mongoose.model("user");
const cropRouter = require("./cropsRoute");
const getToken = user => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isFarmer: user.isFarmer
    },
    "SECRET",
    {
      expiresIn: "48h"
    }
  );
};

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on("connected", () => {
  console.log("conected to mongo");
});

mongoose.connection.on("error", error => {
  console.log("error", error);
});

app.get("/data", (req, res) => {
  Crops.find({})
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      console.log(error.message);
    });
});

app.post("/send-data", (req, res) => {
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

app.post("/delete", (req, res) => {
  Crops.findByIdAndRemove(req.body.id)
    .then(data => {
      res.send(data);
      console.log(data);
    })
    .catch(error => {
      console.log(error.message);
    });
});

app.post("/update", (req, res) => {
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

app.post("/users/signIn", async (req, res) => {
  const signinUser = await User.findOne({
    email: req.body.email,
    password: req.body.password
  });
  if (signinUser) {
    res.send({
      _id: signinUser._id,
      firstname: signinUser.firstname,
      lastname: signinUser.lastname,
      email: signinUser.email,
      phone: signinUser.phone,
      address: signinUser.address,
      isFarmer: signinUser.isFarmer,
      token: getToken(signinUser)
    });
  } else {
    res.status(401).send({ message: "Invalid Email or Password." });
  }
});
app.post("/users/register", async (req, res) => {
   const registerUser = await User.findOne({
    email: req.body.email
  });
  if (registerUser) {
     res.status(401).send({ message: "You have already created your account" });
  } else {
    const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    address: req.body.address,
    isFarmer: req.body.isFarmer
  });
  const newUser = await user.save();
  if (newUser) {
    res.send({
      _id: newUser.id,
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      email: newUser.email,
      phone: newUser.phone,
      address: newUser.address,
      isFarmer: newUser.isFarmer,
      token: getToken(newUser)
    });
  } else {
    res.status(401).send({ message: "Invalid User Data." });
  }
  }
  
});
app.listen(3000, () => {
  console.log("server running");
});
