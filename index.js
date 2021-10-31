const express = require('express');

const app = express();

app.get('/', function(req, res)  { 
    res.send("marwan abbas");
})


app.listen(3000,() => {
    console.log("app is running");
})