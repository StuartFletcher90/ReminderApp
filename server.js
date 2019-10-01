const express = require("express");
const {runQuery, addUser} = require("./app.js");
const app = express();

app.get('/data', async (req, res) => {
    let data =  await runQuery();
    res.send({number:data});
})

app.get('/add', async (req, res) => {
    await addUser(req.query.username, req.query.email);
    res.send({message: "Added to database!"})
});





app.listen(3000, ()=> {
    console.log("Listening on port 3000")
});