const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();

//DB config keys
const db = require('./config/keys').mongoURI;

//Bosy pasrse Middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//conect to monogodb via mongoos
mongoose
    .connect(db)
    .then(() => {
        console.log("connectioon successfull");
    })
    .catch((error) => console.error(error));

//passport middleware
app.use(passport.initialize());
//passport configration
require('./config/passport')(passport);

//using routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;

app.listen(port, function () {
    console.log(`Server for the devConnection at ${port}`);
});