var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
const middlewareObj = require("../middleware");

router.get("/campgrounds/:id/comments/new", middlewareObj.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err)
            res.redirect("/campgrounds/:id ");
        else
            res.render("comments/new", { campground });
    })
});

router.post("/campgrounds/:id/comments", middlewareObj.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err)
            res.redirect("/campgrounds/:id");
        else {
            Comment.create(req.body.comment, (err, comment) => {
                if (err)
                    res.redirect("campgrounds/:id");
                else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

var campground_id;
router.get("/campgrounds/:id/comments/:commentID/edit", middlewareObj.checkCommentOwnership, (req, res) => {
    campground_id = req.params.id;
    Comment.findById(req.params.commentID, (err, comment) => {
        if (err)
            res.redirect("back");
        else
            res.render("comments/edit", { campgroundId: req.params.id, comment });
    })
});

router.put("/campgrounds/:id/comments/:commentID", middlewareObj.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.commentID, req.body.comment, (err, comment) => {
        if (err)
            res.redirect("back");
        else
            res.redirect("/campgrounds/" + campground_id);
    });
});

router.delete("/campgrounds/:id/comments/:commentID", middlewareObj.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndRemove(req.params.commentID, (err) => {
        if (err)
            res.redirect("back");
        else
            res.redirect("/campgrounds/" + req.params.id);
    });
});

module.exports = router;