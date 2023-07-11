const express = require("express");
const path = require("path");
const app = express();
const { LogInCollection, ItemCollection } = require("./mongo");
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

app.get("/home", async (req, res) => {
  try {
    const allData = await ItemCollection.find();
    res.render("home", { data: allData, naming: req.body.name });
  } catch (error) {
    res.send("Error: " + error.message);
  }
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
      res.status(201).render("home", {
        naming: req.body.name,
      });
    } else {
      res.send("Incorrect password");
    }
  } catch (error) {
    res.send("Wrong details");
  }
});

app.post("/upload", async (req, res) => {
  const itemData = {
    title: req.body.title,
    thumbnail: req.body.thumbnail,
    description: req.body.description,
  };

  try {
    await ItemCollection.create(itemData);
    res.redirect("/home");
  } catch (error) {
    res.send("Error: " + error.message);
  }
});

app.post("/edit/:itemId", async (req, res) => {
  const itemId = req.params.itemId;

  try {
    await ItemCollection.findByIdAndUpdate(itemId, req.body);
    res.redirect("/home");
  } catch (error) {
    res.send("Error: " + error.message);
  }
});

app.post("/delete/:itemId", async (req, res) => {
  const itemId = req.params.itemId;

  try {
    await ItemCollection.findByIdAndRemove(itemId);
    res.redirect("/home");
  } catch (error) {
    res.send("Error: " + error.message);
  }
});

app.listen(port, () => {
  console.log("port connected");
});
