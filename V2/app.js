var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose")
const port = 3000;

mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});
var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//     name: "Kaziranga",
//     image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
//     description: "Kaziranga National Park is a protected area in the northeast Indian state of Assam. Spread across the floodplains of the Brahmaputra River, its forests, wetlands and grasslands are home to tigers, elephants and the world’s largest population of Indian one-horned rhinoceroses. Ganges River dolphins swim in the park’s waters. It’s visited by many rare migratory birds, and gray pelicans roost near Kaziranga village"
// }, (err, item) => {
//     console.log("--MongoDB--");
//     if (err)
//         console.log("Error found on creation: " + err);
//     else
//         console.log("Successful creation: " + item);
// });

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
    Campground.findById(req.params.id, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render("show", { campground: item });
        }
    });
})

app.listen(port, () => {
    console.log(`YelpCamp server listening on port number ${port}...`);
});