const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/Users");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log("MongoDB Error:", err));

app.get("/", async (req, res) => {
try {
const users = await UserModel.find({});
res.json(users);
} catch (err) {
res.status(500).json({ error: err.message });
}
});

app.get("/getUser/:id", async (req, res) => {
try {
const user = await UserModel.findById(req.params.id);
res.json(user);
} catch (err) {
res.status(500).json({ error: err.message });
}
});

app.put("/updateUser/:id", async (req, res) => {
try {
const user = await UserModel.findByIdAndUpdate(
req.params.id,
{
name: req.body.name,
email: req.body.email,
age: req.body.age
},
{ new: true }
);

    res.json(user);
} catch (err) {
    res.status(500).json({ error: err.message });
}

});

app.delete("/deleteUser/:id", async (req, res) => {
try {
const user = await UserModel.findByIdAndDelete(req.params.id);
res.json(user);
} catch (err) {
res.status(500).json({ error: err.message });
}
});

app.post("/createUser", async (req, res) => {
try {
const user = await UserModel.create(req.body);
res.json(user);
} catch (err) {
res.status(500).json({ error: err.message });
}
});

module.exports = app;
