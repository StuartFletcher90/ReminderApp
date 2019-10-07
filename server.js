const express = require("express");
const path = require('path');
const {addUser, signIn, addReminder, refresh, deleteRem} = require("./app.js");
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get('/add', async (req, res) => {
    await addUser(req.query.username, req.query.email);
    res.send({message: "Added to database!"})
});

app.get('/signin', async (req, res) => {
    let data = await signIn(req.query.username, req.query.email);
    res.send(data)
});

app.get('/addreminder', async (req, res) => {
    let data = await addReminder(req.query.username, req.query.email, req.query.reminderContent);
    res.send(data)
});

app.get('/refresh', async (req, res) => {
    let data = await refresh(req.query.username, req.query.email);
    res.send(data)
});

app.get('/deletereminder', async (req, res) => {
    let data = await deleteRem(req.query.username, req.query.email, req.query.reminder_id);
    res.send(data)
});

app.listen(3000, ()=> {
    console.log("Listening on port 3000")
});