var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    seedDB = require("./seeds");
const port = 3000;

seedDB();
mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("landing");
});

app.get("/campgrounds", (req, res) => {
    Campground.find({}, (err, items) => {
        if (err)
            console.log(err);
        else
            res.render("index", { camps: items });
    })
});

app.post("/campgrounds", (req, res) => {
    var name = req.body.campName;
    var image = req.body.imageName;
    var desc = req.body.description;
    var newCamp = { name, image, description: desc };
    Campground.create(newCamp, (err, item) => {
        if (err)
            console.log(err);
        else
            res.redirect("campgrounds");
    })
});

app.get("/campgrounds/new", (req, res) => {
    res.render("new");
});

app.get("/campgrounds/:id", (req, res) => {
    Campground.findById(req.params.id).populate("comments").exec((err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(item);
            res.render("show", { campground: item });
        }
    });
})

app.listen(port, () => console.log(`YelpCamp server listening on port number ${port}...`));