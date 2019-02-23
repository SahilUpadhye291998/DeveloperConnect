const express = require('express');
const mongoose = require('mongoose');

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();

//DB config keys
const db = require('./config/keys').mongoURI;

//conect to monogodb via mongoos
mongoose
    .connect(db)
    .then(() => {
        console.log("connectioon successfull");
    })
    .catch((error) => console.error(error));

app.get("/", (request, responce, next) => {
    responce.send("Objective Killed");
})

//using routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);



const port = process.env.PORT || 5000;

app.listen(port, function () {
    console.log(`Server for the devConnection at ${port}`);
});