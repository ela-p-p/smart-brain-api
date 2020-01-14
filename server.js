const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt-nodejs");
const knex = require("knex");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "elizabethporter",
    password: "",
    database: "smart-brain"
  }
});

const app = express();

const database = {
  users: [
    {
      id: 123,
      name: "Ela",
      email: "ela@gmail.com",
      password: "morticia",
      upload: 0,
      joined: new Date()
    },
    {
      id: 124,
      name: "Mark",
      email: "mark@gmail.com",
      password: "penelope",
      upload: 0,
      joined: new Date()
    }
  ]
};

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json(database.users);
});

app.post("/signin", (req, res) => {
  const { email, password } = req.body;
  database.users.forEach(user => {
    if (user.email === email && user.password === password) {
      return res.json(user);
    }
  });
  return res.json("invalid login");
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  db("users")
    .returning("*")
    .insert({
      email: email,
      name: name,
      joined: new Date()
    })
    .then(user => {
      res.json(user[0]);
    })
    .catch(err => res.status(400).json("unable to register"));
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if (user.id === Number(id)) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    return res.json("user doesn't exist");
  }
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach(user => {
    if (user.id === Number(id)) {
      user.upload++;
      found = true;
      return res.json(user.upload);
    }
  });
  if (!found) {
    return res.json("user doesn't exist");
  }
});

app.listen(3000, () => {
  console.log("running on port 3000");
});

//routes needed
// / --> working? GET
// /signin --> POST use req.body for privacy
// /register --> POST
// /profile:id --> GET  req.params
// /image --> PUT  update ranking
