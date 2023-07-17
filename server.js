// needs to be always running / on and listening
// listen for requests and respond to them

// stay awake

// react - makes your life easier in the frontend
// express - makes your life easier in the backend

// basic server
import express from "express";

const app = express();

// API "routes" - endpoint
app.get("/send-back-html", (req, res) => res.send("<h1 style='color:red'>here is your pizza</h1>"));

app.get("/send-back-json", (req, res) => res.send({ name: "pizza", price: 10 }));

app.listen(4444, () => console.log("running on localhost:4444"));
