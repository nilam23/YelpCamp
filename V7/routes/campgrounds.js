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

router.post("/campgrounds", (req, res) => {
    var name = req.body.campName;
    var image = req.body.imageName;
    var desc = req.body.description;
    var newCamp = { name, image, description: desc };
    Campground.create(newCamp, (err, camp) => {
        if (err)
            console.log(err);
        else
            res.redirect("campgrounds");
    })
});

router.get("/campgrounds/new", (req, res) => {
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

module.exports = router;