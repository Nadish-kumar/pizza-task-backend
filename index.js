import express from "express";
import mongoose from "mongoose";
import users from "./dbperson.js";
import cors from "cors";
import bcrypt from "bcryptjs";
import url from "./urldb.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import "dotenv/config";
import admin from "./dbadmin.js";
import bread from "./Breaddb.js";
import sauce from "./Saucedb.js";
import cheese from "./Cheesedb.js";
import veg from "./Veggiesdb.js";
import meat from "./Meatdb.js";
import Razorpay from "razorpay";

var instance = new Razorpay({
  key_id: "rzp_test_WVu8bni55PVN2d",
  key_secret: "dVFjJRoia3zCc9B8gg4lQr7R",
});

let option = {
  origin: "http://localhost:3000",
};

//appconfig
const secret = "4641316895";
const app = express();
const port = process.env.PORT || 8001;
const connection__url =
  "mongodb+srv://nadish:nadish@cluster0.2cquf.mongodb.net/nadish?retryWrites=true&w=majority";
//middlewares
app.use(express.json());
app.use(cors());
let authenticate = (req, res, next) => {
  if (req.headers.authentication) {
    try {
      let result = jwt.verify(req.headers.authentication, secret);
      next();
    } catch (error) {
      res.status(401).json({ mesaagae: "token expired" });
    }
  } else {
    res.status(401).json({ message: "not authorized" });
  }
};
//db config
mongoose.connect(connection__url);
//api endpoint
app.get("/", (req, res) => {
  res.status(200).send("hello nadish programer");
});

app.post("/register-user", (req, res) => {
  //hash the password
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(req.body.password, salt);
  req.body.password = hash;
  const dbcard = req.body;
  console.log(dbcard);
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "yatkumar246@gmail.com",
      pass: "8489537070",
    },
  });

  let mailoption = {
    from: "yatkumar246@gmail.com",
    to: req.body.email,
    subject: "Pizza Hut authentication verify mail",
    text: `Hello ${req.body.name} . Your Smile is very cute its very important to as! so please take your pizza with more smile and happiness`,
  };

  transporter.sendMail(mailoption, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("email send !!!!!");
    }
  });
  users.create(dbcard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.put("/register-user", async (req, res) => {
  try {
    let user = await users.findOne({ email: req.body.email });
    if (user) {
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(req.body.password, salt);
      req.body.password = hash;
      const dbcard = req.body;
      users.updateOne(dbcard, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(data);
        }
      });
    } else {
      res.status(401).json({ message: "user not found" });
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/main", authenticate, (req, res) => {
  res.json({ mesaagae: 20 });
});

app.post("/login-user", async (req, res) => {
  //find the email matches
  try {
    let user = await users.findOne({ email: req.body.email });
    if (user) {
      let passwordresult = await bcrypt.compare(
        req.body.password,
        user.password
      );
      console.log(passwordresult);
      if (passwordresult) {
        let token = jwt.sign({ userid: user._id }, secret, { expiresIn: "1d" });
        res.json({ token });
      } else {
        res.status(401).json({ message: "wrong password" });
      }
    } else {
      res.status(401).json({ message: "user not found" });
    }
  } catch (error) {
    console.log(error);
  }
});

//admin details post method
app.post("/register-admin", (req, res) => {
  //hash the password
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(req.body.password, salt);
  req.body.password = hash;
  const dbcard = req.body;
  console.log(dbcard);
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "yatkumar246@gmail.com",
      pass: "8489537070",
    },
  });

  let mailoption = {
    from: "yatkumar246@gmail.com",
    to: req.body.email,
    subject: "Pizza Hut Admin authentication verify mail",
    text: `Hello ${req.body.name} . Your are the responsible person please take care of the pizza hut and server best to the customers`,
  };

  transporter.sendMail(mailoption, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("email send !!!!!");
    }
  });
  admin.create(dbcard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

//login admin
app.post("/login-admin", async (req, res) => {
  //find the email matches
  try {
    let user = await admin.findOne({ email: req.body.email });
    if (user) {
      let passwordresult = await bcrypt.compare(
        req.body.password,
        user.password
      );
      console.log(passwordresult);
      if (passwordresult) {
        let token = jwt.sign({ userid: user._id }, secret, { expiresIn: "1d" });
        res.json({ token });
      } else {
        res.status(401).json({ message: "wrong password" });
      }
    } else {
      res.status(401).json({ message: "user not found" });
    }
  } catch (error) {
    console.log(error);
  }
});

//forgot password method
app.put("/register-admin", async (req, res) => {
  try {
    let user = await admin.findOne({ email: req.body.email });
    if (user) {
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(req.body.password, salt);
      req.body.password = hash;
      const dbcard = req.body;
      admin.updateOne(dbcard, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(data);
        }
      });
    } else {
      res.status(401).json({ message: "user not found" });
    }
  } catch (error) {
    console.log(error);
  }
});

//post bread
app.post("/bread", (req, res) => {
  const dbcard = req.body;
  console.log(dbcard);
  bread.create(dbcard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

//get bread
app.get("/bread", (req, res) => {
  const dbcard = req.body;

  bread.find(dbcard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

//post sauce
app.post("/sauce", (req, res) => {
  const dbcard = req.body;
  console.log(dbcard);
  sauce.create(dbcard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

//get sauce
app.get("/sauce", (req, res) => {
  const dbcard = req.body;

  sauce.find(dbcard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

//post cheese
app.post("/cheese", (req, res) => {
  const dbcard = req.body;
  console.log(dbcard);
  cheese.create(dbcard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

//get cheese
app.get("/cheese", (req, res) => {
  const dbcard = req.body;

  cheese.find(dbcard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
// post veggies
app.post("/veg", (req, res) => {
  const dbcard = req.body;
  console.log(dbcard);
  veg.create(dbcard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
//get veggies
app.get("/veg", (req, res) => {
  const dbcard = req.body;

  veg.find(dbcard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

//post meat
app.post("/meat", (req, res) => {
  const dbcard = req.body;
  console.log(dbcard);
  meat.create(dbcard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

//get meat
app.get("/meat", (req, res) => {
  const dbcard = req.body;

  meat.find(dbcard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/payment", async (req, res, next) => {
  const { amount } = req.body;

  var params = await {
    amount: Number(amount) * 100,
    currency: "INR",
    receipt: "su001",
    payment_capture: "1",
  };
  await instance.orders
    .create(params)
    .then((data) => {
      return res.send({ sub: data, status: "success" });
    })
    .catch((error) => {
      console.log(error, "Razorpay");
      return res.send({ sub: error, status: "failed" });
    });
});

//listener
app.listen(port, () => console.log(`listening on localhost: ${port}`));
