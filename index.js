const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const password = "";
const username = "";

const url = `mongodb+srv://${username}:${password}@cluster0.ijopi3a.mongodb.net/?retryWrites=true&w=majority`;

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.set("strictQuery", false);
mongoose.connect(url);

// Define User schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

// Route to serve the registration form
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Route to handle form submissions
app.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  // Save user data to MongoDB
  const newUser = new User({
    username,
    email,
    password,
  });

  newUser.save().then((result) => {
    console.log("note saved!");
    mongoose.connection.close();
  });
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
