var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
const middlewareObj = require("../middleware");

router.get("/campgrounds", (req, res) => {
    //console.log(req.user);
    Campground.find({}, (err, camps) => {
        if (err)
            console.log(err);
        else
            res.render("campgrounds/index", { camps });
    })
});

router.post("/campgrounds", middlewareObj.isLoggedIn, (req, res) => {
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

router.get("/campgrounds/new", middlewareObj.isLoggedIn, (req, res) => {
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

router.get("/campgrounds/:id/edit", middlewareObj.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, camp) => {
        if (err)
            res.redirect("/campgroounds");
        else
            res.render("campgrounds/edit", { camp });
    });
});

router.put("/campgrounds/:id", middlewareObj.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndUpdate(req.params.id, req.body.camp, (err, camp) => {
        if (err)
            res.redirect("/campgrounds");
        else
            res.redirect("/campgrounds/" + req.params.id);
    });
});

router.delete("/campgrounds/:id", middlewareObj.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndRemove(req.params.id, (err) => {
        if (err)
            res.redirect("/campgrounds");
        else
            res.redirect("/campgrounds");
    });
});

module.exports = router;