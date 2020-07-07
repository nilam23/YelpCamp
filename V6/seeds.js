var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Kaziranga",
        image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
        description: "Kaziranga National Park is a protected areaof Assam. Spread across the floodplains of the Brahmaputra River, its forests, wetlands and grasslands are home to tigers, elephants and the world’s largest population of Indian one-horned rhinoceroses. Ganges River dolphins swim in the park’s waters. It’s visited by many rare migratory birds, and gray pelicans roost near Kaziranga village"
    },
    {
        name: "Shillong",
        image: "https://invinciblengo.org/photos/event/slider/mount-abu-trekking-camp-aravalli-hills-rajasthan-nbMgzbA-1440x810.jpg",
        description: "Shillong is a hill station in northeast India and capital of the state of Meghalaya. It’s known for the manicured gardens at Lady Hydari Park. Nearby, Ward’s Lake is surrounded by walking trails. North, the Don Bosco Centre for Indigenous Cultures features displays on the region’s native people"
    },
    {
        name: "Sikkim",
        image: "https://images.thrillophilia.com/image/upload/s--9ByEiO4a--/c_fill,f_auto,fl_strip_profile,g_auto,h_600,q_auto,w_975/v1/images/photos/000/127/484/original/1524601593_shutterstock_1031769316.jpg.jpg?1524601593",
        description: "Sikkim is a state in northeast India, bordered by Bhutan, Tibet and Nepal. Part of the Himalayas, the area has a dramatic landscape that includes India’s highest mountain, 8,586m Kangchenjunga. Sikkim is also home to glaciers, alpine meadows and thousands of varieties of wildflowers. Steep paths lead to hilltop Buddhist monasteries such as Pemayangtse, which dates to the early 1700s."
    }
];

function seedDB() {
    Campground.remove({}, (err) => {
        if (err)
            console.log(err);
        data.forEach(seed => {
            Campground.create(seed, (err, camp) => {
                if (err)
                    console.log(err);
                else {
                    Comment.create(
                        {
                            text: "This is a fun place to be over summer.",
                            author: "Edson"
                        }, (err, comment) => {
                            if (err)
                                console.log(err);
                            else {
                                camp.comments.push(comment);
                                camp.save();
                            }
                        }
                    );
                }
            });
        });
    });
}

module.exports = seedDB;