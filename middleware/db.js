const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/Codeswear?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"

const connetToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("connect to mongodb compass successfully");
    })
}

module.exports = connetToMongo;