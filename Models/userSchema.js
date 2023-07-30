const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    userID: {
        type: String,
        required: true,
    },
    id18: {
        type: String,
        required: false,
    },
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    prodlink: {
        type: String,
        required: false
    },
    delcharge: {
        type: String,
        required: false
    },
    accrange: {
        type: Number,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    reqgender: {
        type: String,
        required: false
    },


});

const usr = mongoose.model('Usr', UserSchema);

module.exports = usr;
