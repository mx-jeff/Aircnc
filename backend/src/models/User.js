const mogoose = require('mongoose')

const UserSchema = new mogoose.Schema({
    //mane: String,
    email: String,
    //age: Number,
    //active: Boolean,
})

module.exports = mogoose.model('User', UserSchema)