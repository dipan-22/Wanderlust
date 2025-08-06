// Basic setup
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");

// connecting mongoose 
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main()
{
    await mongoose.connect(MONGO_URL);
}


app.listen(3000, () => {
    console.log("Server is listening to port 3000");
});

app.get("/", (req, res) => {
    res.send("Hi,I am root");
})

//testing the listing route
app.get("/testlisting", async(req, res) => {
    let sampleListing = new Listing({
        title: "My Home",
        description: "By the beach",
        price: 1200,
        location: "Calangute,Goa",
        country: "India"
    });

    await sampleListing.save();
    console.log("Sample was saved");
    res.send("Successfull testing");
});
