var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function (req, res, next) {
    //is user logged in?
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, (err, camp) => {
            if (err)
                res.redirect("back");
            else {
                //does the current use own the campground?
                if (camp.author.id.equals(req.user._id))
                    next();
                else
                    res.redirect("back");
            }
        });
    } else {
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function (req, res, next) {
    //is user logged in?
    if (req.isAuthenticated()) {
        Comment.findById(req.params.commentID, (err, comment) => {
            if (err)
                res.redirect("back");
            else {
                //does the current use own the campground?
                if (comment.author.id.equals(req.user._id))
                    next();
                else
                    res.redirect("back");
            }
        });
    } else {
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = middlewareObj;