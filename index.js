const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const username = "test";
const password = process.argv[2];

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
    res.sendFile(__dirname + "/views/success.html");
    //mongoose.connection.close();
  });
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
