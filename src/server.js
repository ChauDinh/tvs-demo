import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import "dotenv/config";

import User from "./models/User.model";
import Product from "./models/Product.model";

// Connect to mongodb database
const dbUrl = process.env.DB_HOST || "mongodb://localhost:27017/tvs-demo";
mongoose.set("useCreateIndex", true);

const connectDb = () => {
  return mongoose.connect(dbUrl, { useNewUrlParser: true });
};

const app = express();
const PORT = process.env.PORT || 3000;

const orders = [
  { id: 1, name: "A" },
  { id: 2, name: "B" },
  { id: 3, name: "C" },
  { id: 4, name: "aaa" },
  { id: 5, name: "abc" },
  { id: 6, name: "asdjafd" }
];

// Setup view engine
app.set("view engine", "pug");
app.set("views", "./src/views");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  User.find().then(users => {
    res.render("index", {
      users: users
    });
  });
});

app.get("/location", (req, res) => {
  res.render("location/index", {
    locations: [
      { id: 1, name: "Ho Chi Minh" },
      { id: 2, name: "Vung Tau" },
      { id: 3, name: "Ha Noi" },
      { id: 4, name: "Hue" },
      { id: 5, name: "Da Nang" }
    ]
  });
});

app.get("/showcard", (req, res) => {
  res.render("showcard/index");
});

app.get("/account", (req, res) => {
  res.render("account/index", {
    orders: orders
  });
});

app.get("/account/search", (req, res) => {
  let keyword = req.query.keyword.toLowerCase();
  let matchedOrders = orders.filter(
    order => order.name.toLowerCase().indexOf(keyword) !== -1
  );

  res.render("account/index", {
    value: keyword,
    orders: matchedOrders
  });
});

app.get("/account/register", (req, res) => {
  res.render("account/register");
});

app.post("/account/register", async (req, res) => {
  const { username, email, password, avatar } = req.body;
  const newUser = new User({
    username: username,
    email: email,
    password: password,
    avatar: avatar
  });

  await newUser.save((error, User) => {
    if (error) {
      console.error(error);
    } else {
      console.log(`A new user was created successfully!`);
    }
  });
  res.redirect("/");
});

const eraseDatabaseOnSync = true;

connectDb().then(async () => {
  if (eraseDatabaseOnSync) {
    await Promise.all([User.deleteMany({}), Product.deleteMany({})]);
  }
  app.listen(PORT, () => console.log(`🎉 The app listening on port ${PORT}`));
});
