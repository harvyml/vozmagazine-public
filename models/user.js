const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
var Schema = mongoose.Schema

const user = new Schema({
    _id: Schema.Types.ObjectId,//mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    password: String,
    phone: String,
    role: Number
}, {collection: "users"})

user.methods.comparePassword = function(password){
    try {
        return bcrypt.compareSync(password, this.password);
    }catch(err){
        return err.message
    }
}

module.exports = mongoose.model('User', user)