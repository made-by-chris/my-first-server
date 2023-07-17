import express from "express";
import db from "./db.js";

import dotenv from "dotenv";
dotenv.config();

console.log(db);
const app = express();

const homepage = `
<html>
    <H1>hello world</H1>
    <a href="/">Go To home</a>
    <a href="/projects">projects (doesnt exist yet)</a> 
    <a href="/contact">contact (doesnt exist yet)</a> 
    <a href="/resume">resume (doesnt exist yet)</a> 
    <a href="/about">about</a>
    <div id="list"></div>
    <script>
      console.log("im in the browser");
      fetch("/search?name=pasta")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const list = document.getElementById("list");
          data.forEach((restaurant) => {
            const div = document.createElement("div");
            div.innerHTML = restaurant.name  + " (" + restaurant.ethnicity + ") "
            list.appendChild(div);
          });
        });
    </script>
</html>
`;

console.log("im in the server");

// route 1 returns some html
app.get("/", (req, res) => res.send(homepage));

// route 2 returns a string of text
app.get("/about", (req, res) => res.send("about: im a fullstack developer 😎"));

// route 3 returns JSON
app.get("/user-data", (req, res) => res.send({ username: "bob", age: 123 }));

// route 4 takes a search and return info about that search
// https://www.google.com/search?q=cats
// QUERY STRING containing QUERY PARAMETERS
// ?diet=vegan&location=berlin&style=sudanese
app.get("/search", (req, res) => {
  console.log("the received query parameters are ", req.query);
  const matchingRestaurants = db.filter((restaurant) => {
    return restaurant.name.toLowerCase().includes(req.query.name.toLowerCase());
  });
  res.send(matchingRestaurants.length > 0 ? matchingRestaurants : "sorry there are no restaurants matching your criteria");
});

app.listen(process.env.PORT, () => console.log("Server is running on port " + process.env.PORT));
