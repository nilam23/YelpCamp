var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

router.get("/campgrounds", (req, res) => {
    //console.log(req.user);
    Campground.find({}, (err, camps) => {
        if (err)
            console.log(err);
        else
            res.render("campgrounds/index", { camps });
    })
});

router.post("/campgrounds", isLoggedIn, (req, res) => {
    var name = req.body.campName;
    var image = req.body.imageName;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCamp = { name, image, description, author };
    Campground.create(newCamp, (err, camp) => {
        if (err)
            console.log(err);
        else {
            res.redirect("campgrounds");
        }
    })
});

router.get("/campgrounds/new", isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
});

router.get("/campgrounds/:id", (req, res) => {
    Campground.findById(req.params.id).populate("comments").exec((err, campground) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render("campgrounds/show", { campground });
        }
    });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;