const mongoose = require("mongoose");




const userSchema = mongoose.Schema({
    email: String,
    pass: String,
    name : String
    
}, {
    versionKey:false
})

const UserModel = mongoose.model("user", userSchema);
module.exports = {
    UserModel
}

