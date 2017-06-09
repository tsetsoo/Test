var mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   price: String,
   location: String,
   lat: Number,
   lng: Number,
   description: String,
      author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
   comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
      }   
   ]
});

var Campground = mongoose.model("Campground", campgroundSchema);
module.exports = Campground;