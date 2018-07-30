const mongoose = require('mongoose');
const { Schema} = mongoose;

const userSchema = new Schema({
    googleId : String
})

// creating the collection/model-class named users
mongoose.model('users', userSchema)