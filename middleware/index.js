var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = {};


middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You must be loggen in to do that!");
    res.redirect("/login");
}

middlewareObj.isCommentOwner = function(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.user.isAdmin){
            next();
        } else {
            Comment.findById(req.params.commentId, function(err, comment) {
               if (err) {
                    req.flash("error", "Comment was not found!");
                   res.redirect("back");
               } else {
                   if (comment.author.id.equals(req.user._id)) {
                       next();
                   } else {
                        req.flash("error", "You don't have permission to do that!");
                        res.redirect("back");
                   }
               }
            });
        }
    } else {
        req.flash("error", "You must be loggen in to do that!");
        res.redirect("back");
    }
}

middlewareObj.isCampgroundOwner = function(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.user.isAdmin){
            next();
        } else {
            Campground.findById(req.params.id, function(err, campground) {
               if (err) {
                    req.flash("error", "Campground was not found!");
                    res.redirect("back");
               } else {
                   if (campground.author.id.equals(req.user._id)) {
                       next();
                   } else {
                        req.flash("error", "You don't have permission to do that!");
                        res.redirect("back");
                   }
               }
            });
        }
    } else {
        req.flash("error", "You must be loggen in to do that!");
        res.redirect("back");
    }
}

module.exports = middlewareObj;