// this js file contains the initialisation of the sample data
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

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

// initialising the sample data
const initDB = async () => {
    await Listing.deleteMany({});// to delete any prestored data
    await Listing.insertMany(initData.data);
    console.log("data was initialised");
}

initDB();
// run init/index.js to complete initialisation