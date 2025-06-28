const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    password: String,
    img:String,
});

module.exports = mongoose.model("User", UserSchema);
