const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt-nodejs");
const knex = require("knex");

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

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

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.json(database.users));
app.post("/signin", signin.handleSignIn(bcrypt, db));
app.post("/register", register.handleRegister(bcrypt, db));
app.get("/profile/:id", profile.handleGetProfile(db));
app.put("/image", image.addUpload(db));
app.post("/imageUrl",image.handleApiCall);

app.listen(3000, () => {
  console.log("running on port 3000");
});

//routes needed
// / --> working? GET
// /signin --> POST use req.body for privacy
// /register --> POST
// /profile:id --> GET  req.params
// /image --> PUT  update ranking
