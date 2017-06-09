var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's rest",
        image: "http://haulihuvila.com/wp-content/uploads/2012/09/hauli-huvila-campgrounds-lg.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa, expedita, officiis, animi vero tenetur veniam obcaecati reprehenderit nulla enim sequi magni voluptatem minima deleniti accusantium neque laborum repellat corporis numquam?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa, expedita, officiis, animi vero tenetur veniam obcaecati reprehenderit nulla enim sequi magni voluptatem minima deleniti accusantium neque laborum repellat corporis numquam?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa, expedita, officiis, animi vero tenetur veniam obcaecati reprehenderit nulla enim sequi magni voluptatem minima deleniti accusantium neque laborum repellat corporis numquam?"
    },    
    {
        name: "Cloud's Rest 2",
        image: "https://www.fs.usda.gov/Internet/FSE_MEDIA/stelprdb5253636.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa, expedita, officiis, animi vero tenetur veniam obcaecati reprehenderit nulla enim sequi magni voluptatem minima deleniti accusantium neque laborum repellat corporis numquam?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa, expedita, officiis, animi vero tenetur veniam obcaecati reprehenderit nulla enim sequi magni voluptatem minima deleniti accusantium neque laborum repellat corporis numquam?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa, expedita, officiis, animi vero tenetur veniam obcaecati reprehenderit nulla enim sequi magni voluptatem minima deleniti accusantium neque laborum repellat corporis numquam?"
    },    
    {
        name: "Cloud's Rest 3",
        image: "http://visitindianacountypa.org/wp-content/themes/indianna/images/graphics/wheel%20in%20campground%20(2).jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa, expedita, officiis, animi vero tenetur veniam obcaecati reprehenderit nulla enim sequi magni voluptatem minima deleniti accusantium neque laborum repellat corporis numquam?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa, expedita, officiis, animi vero tenetur veniam obcaecati reprehenderit nulla enim sequi magni voluptatem minima deleniti accusantium neque laborum repellat corporis numquam?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa, expedita, officiis, animi vero tenetur veniam obcaecati reprehenderit nulla enim sequi magni voluptatem minima deleniti accusantium neque laborum repellat corporis numquam?"
    },
    ]

function seedDb(){
    
    // remove campgrounds
    Campground.remove({}, function(err){
        if (err) {
           console.log(err); 
        } else {
            console.log("removed db");
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                   if (err) {
                       console.log(err);
                   } else {
                       console.log("created campground");
                       Comment.create(
                            {
                                text: "Great campground",
                                author: "Homer"
                            }
                       , function(err, comment){
                           if (err) {
                               console.log(err);
                           } else {
                               console.log("comment added");
                               campground.comments.push(comment);
                               campground.save();
                           }
                       })
                   }
                }); 
            });
        }
    });


}
module.exports = seedDb;