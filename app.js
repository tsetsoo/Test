var express = require("express");
var bodyparser = require("body-parser");
var app = express();
var mongoose = require("mongoose");
var seedDb = require("./seed");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var User = require("./models/user");
var methodOverride = require("method-override");
var flash = require("connect-flash");

var campgroundRoutes = require("./routes/campgrounds"),
      commentsRoutes = require("./routes/comments"),
         indexRoutes = require("./routes/index");

var url = process.env.DATABASEURL || "mongodb://localhost/YelpCamp";
mongoose.connect(url);
app.use(express.static(__dirname + "/public/"));
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine", "ejs");
//seedDb();

//Passport configuration
app.use(require("express-session")({
    secret: "Lucky is cure",
    resave: false,
    saveUninitialized: false
}));

app.locals.moment = require('moment');
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    res.locals.mapkey = process.env.GMAPSKEY;
    next();
});
app.use(methodOverride("_method"));

  //Routes       
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentsRoutes);
app.use("/", indexRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Yelp camp has started"); 
});