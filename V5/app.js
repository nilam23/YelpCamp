var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    seedDB = require("./seeds");
const port = 3000;

mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

app.get("/", (req, res) => {
    res.render("landing");
});

app.get("/campgrounds", (req, res) => {
    Campground.find({}, (err, camps) => {
        if (err)
            console.log(err);
        else
            res.render("campgrounds/index", { camps });
    })
});

app.post("/campgrounds", (req, res) => {
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

app.get("/campgrounds/new", (req, res) => {
    res.render("campgrounds/new");
});

app.get("/campgrounds/:id", (req, res) => {
    Campground.findById(req.params.id).populate("comments").exec((err, campground) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render("campgrounds/show", { campground });
        }
    });
});

app.get("/campgrounds/:id/comments/new", (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err)
            res.redirect("/campgrounds/:id ");
        else
            res.render("comments/new", { campground });
    })
});

app.post("/campgrounds/:id/comments", (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err)
            res.redirect("/campgrounds/:id");
        else {
            Comment.create(req.body.comment, (err, comment) => {
                if (err)
                    res.redirect("campgrounds/:id");
                else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

app.listen(port, () => console.log(`YelpCamp server listening on port number ${port}...`));