const mongoose = require('mongoose');

const AuthSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    uniqueToken: {
        type: String,
    }
});

const authModel = mongoose.model('AuthModel', AuthSchema);
module.exports = authModel;