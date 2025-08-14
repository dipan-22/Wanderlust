// Basic setup
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");
const ejsMate = require("ejs-mate");


app.set("view engine", 'ejs');
app.set("views", path.join(__dirname, "views"));
const methodOverride = require("method-override");
app.use(express.urlencoded
    ({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));



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
// app.get("/testlisting", async(req, res) => {
//     let sampleListing = new Listing({
//         title: "My Home",
//         description: "By the beach",
//         price: 1200,
//         location: "Calangute,Goa",
//         country: "India"
//     });

//     await sampleListing.save();
//     console.log("Sample was saved");
//     res.send("Successfull testing");
// });

// Index. route
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
});
// New and Create route
app.get("/listings/new", async (req, res) => {
    res.render("listings/new.ejs")
});


// Show Route
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
});

//Create route
app.post("/listings", async(req, res) => {
    //     let { title, description,image, price,location, country} = req.body;
    // }) // general method
     //let listing = req.body.listing;
     const newListing = new Listing(req.body.listing);//creating an instance
    // newListing.save().then((res) => {
    //     console.log("Saved");
    // })
    //     .catch((err) => {
    //         console.log("Error while saving",err);
    // })
    await newListing.save();
    res.redirect("/listings");
    //console.log(listing);
});

//Edit route
app.get("/listings/:id/edit", async(req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
})
// install method-override

// Update route
app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
})

//Delete route
// show.ejs
app.delete("/listings/:id", async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
});

