var express = require("express");
var router = express.Router({mergeParams: true});
var Comment = require("../models/comment");
var Campground = require("../models/campground");
var middleware = require("../middleware")

//New comment
router.get("/new", middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground){
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground}); 
        }
    });
});

//create comment
router.post("/", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            var comment = req.body.comment;
            Comment.create(comment, function(err, comment){
                if (err) {
                    req.flash("error", "Something went wrong!");
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Comment added");
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

router.get("/:commentId/edit", middleware.isCommentOwner, function(req, res){
    Comment.findById(req.params.commentId, function(err, comment) {
        if (err) {
            req.flash("error", "Comment was not found!");
            console.log(err);
        } else {
            res.render("comments/edit", {campgroundId: req.params.id, comment: comment});
        }
    });
});

router.put("/:commentId", middleware.isCommentOwner, function(req, res){
    Comment.findByIdAndUpdate(req.params.commentId, req.body.comment, function(err, comment){
        if (err) {
            req.flash("error", "Comment was not found!");
            console.log(err);
        } else {
            req.flash("success", "Comment edited");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

router.delete("/:commentId", middleware.isCommentOwner, function(req, res){
    Comment.findByIdAndRemove(req.params.commentId, function(err){
        if(err){
            req.flash("error", "Comment was not found!");
            res.redirect("back");  
        } else {
            req.flash("success", "Comment deleted!");
            res.redirect("/campgrounds/" + req.params.id);
        }
   }); 
});

module.exports = router;