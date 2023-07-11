const express = require("express");
const path = require("path");
const app = express();
const LogInCollection = require("./mongo");
const port = process.env.PORT || 3000;
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

const tempelatePath = path.join(__dirname, "../tempelates");
const publicPath = path.join(__dirname, "../public");
console.log(publicPath);

app.set("view engine", "hbs");
app.set("views", tempelatePath);
app.use(express.static(publicPath));

app.get("/signup", (req, res) => {
  res.render("signup");
});
app.get("/", (req, res) => {
  res.render("login");
});

app.get("/home", (req, res) => {
  res.render("home");
});

app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.name,
    password: req.body.password,
  };

  const checking = await LogInCollection.findOne({ name: req.body.name });

  try {
    if (checking && checking.password === req.body.password) {
      return res.send("User details already exist");
    } else {
      await LogInCollection.create(data);
    }
  } catch (error) {
    return res.send("Error: " + error.message);
  }

  res.status(201).render("home", {
    naming: req.body.name,
  });
});

app.post("/login", async (req, res) => {
  try {
    const check = await LogInCollection.findOne({ name: req.body.name });

    if (check && check.password === req.body.password) {
      res.status(201).render("home", { naming: `${req.body.name}` });
    } else {
      res.send("Incorrect password");
    }
  } catch (error) {
    res.send("Wrong details");
  }
});

app.listen(port, () => {
  console.log("port connected");
});
