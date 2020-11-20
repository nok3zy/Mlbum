const express = require("express");

const app = express();

const PORT = 9999;

const handleListen=()=>{
    console.log(`Listen on ${PORT}`)
}

app.use("/public",express.static("public"));

app.listen(PORT,handleListen);

