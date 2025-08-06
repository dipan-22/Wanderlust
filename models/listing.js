const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    description:  {
        type: String,   
    },
    image:
    {
        // type: String,
        // default: "https://unsplash.com/photos/man-sitting-on-rock-surrounded-by-water--Q_t4SCN8c4",
        // set: (v) => v === "" ? "https://unsplash.com/photos/man-sitting-on-rock-surrounded-by-water--Q_t4SCN8c4" : v,
          filename: {
      type: String,
      default: 'default.jpg'
    },
    url: {
      type: String,
      default: 'https://unsplash.com/photos/man-sitting-on-rock-surrounded-by-water--Q_t4SCN8c4'
    }
    },
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;