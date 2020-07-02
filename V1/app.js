var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

var camps = [
    { name: "Kaziranga", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg" },
    { name: "Shillong", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg" },
    { name: "Majuli", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg" },
    { name: "Kaziranga", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg" },
    { name: "Shillong", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg" },
    { name: "Majuli", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg" },
    { name: "Kaziranga", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg" },
    { name: "Shillong", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg" },
    { name: "Majuli", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg" }
];

app.get("/", (req, res) => {
    res.render("landing");
});

//this route will show all the campgrounds
app.get("/campgrounds", (req, res) => {
    res.render("campgrounds", { camps: camps });
});


//this route is to create a new campground
app.post("/campgrounds", (req, res) => {
    var name = req.body.campName;
    var image = req.body.imageName;
    var newCamp = { name, image };
    camps.push(newCamp);
    res.redirect("campgrounds");
});

//this route shows the form that sends the data to the campground-post route
app.get("/campgrounds/new", (req, res) => {
    res.render("new");
});

app.listen(port, () => {
    console.log(`YelpCamp server listening on port number ${port}...`);
});