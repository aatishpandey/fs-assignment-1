const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;

// app.use(bodyParser.json);
// app.use(express.urlencoded({ extended: true }));

let USERS = [
  {
    firstname: "Aatish",
    lastname: "Pandey",
    email: "aatish0808@gmail.com",
    password: "1234",
  },
];
const QUESTIONS = [];
const SUBMISSIONS = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//signup page
app.get("/signup", (req, res) => {
  res.sendFile(__dirname + "/pages/signup.html");
});

app.post("/signup", function (req, res) {
  // Add logic to decode body
  // body should have email and password

  //Store email and password (as is for now) in the USERS array above (only if the user with the given email doesnt exist)

  // return back 200 status code to the clien
  console.log(req.body);

  const reqBody = req.body;
  let userExist = false;

  //add email password to USERs array
  USERS.forEach((user) => {
    if (user.email === reqBody.email) {
      userExist = true;
    }
  });

  if (userExist) {
    res.status(400).json({
      message: "User already exists. Please try with different email.",
    });
  } else {
    USERS = [...USERS, reqBody]; //add user to USERS array
    res.status(200).json({ message: "User added" });
  }
  // res.send("status 200");
});

//login page
app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/pages/login.html");
});

app.post("/login", function (req, res) {
  // Add logic to decode body
  // body should have email and password

  // Check if the user with the given email exists in the USERS array
  // Also ensure that the password is the same

  // If the password is the same, return back 200 status code to the client
  // Also send back a token (any random string will do for now)
  // If the password is not the same, return back 401 status code to the client

  console.log(req.body);

  const reqBody = req.body;
  let userExist = false;
  const token = "iambinod";

  USERS.forEach((user) => {
    if (user.email === reqBody.email && user.password === reqBody.password) {
      userExist = true;
    }
  });

  if (userExist) {
    res.status(200).json({ token, message: "Login successful" });
  } else {
    res.status(401).json({ message: "user not found" });
  }

  // res.send("login");
});

app.get("/questions", function (req, res) {
  //return the user all the questions in the QUESTIONS array
  res.sendFile(__dirname + "/pages/questions.html");
});

app.get("/submissions", function (req, res) {
  // return the users submissions for this problem
  res.sendFile(__dirname + "/pages/submissions.html");
});

app.post("/submissions", function (req, res) {
  // let the user submit a problem, randomly accept or reject the solution
  // Store the submission in the SUBMISSION array above
  res.send("submit");
});

// leaving as hard todos
// Create a route that lets an admin add a new problem
// ensure that only admins can do that.

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
