const mongoose = require("mongoose");

const conn = async (req, res) => {
    try {
        await mongoose.connect("mongodb+srv://uday2122:212232@tasklist.gz3hm.mongodb.net/").then(() => {
            console.log("Connected");
        });

    } catch (error) {
        res.status(400).json({
            message: "Not Connected",
        });
    }

};
conn(); 