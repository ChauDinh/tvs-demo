import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3000;

// Setup view engine
app.set("view engine", "pug");
app.set("views", "./src/views");

app.use(cors());

app.get("/", (req, res) => {
  res.render("index", {
    name: "AAA"
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
    orders: [
      { id: 1, name: "A" },
      { id: 2, name: "B" },
      { id: 3, name: "C" }
    ]
  });
});

app.listen(PORT, () => console.log(`🎉 The app listening on port ${PORT}`));
