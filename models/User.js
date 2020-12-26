const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    USERNAME: {
        type: String,
        required: true,
    },
    EMAIL: {
        type: String,
        required: true,
        unique: true,
    },
    FIRSTNAME: {
        type: String,
        required: true,
    },
    LASTNAME: {
        type: String,
        required: true,
    },
    BIRTHDATE: {
        type: Date,
        required: true,
    },
    DESCRIPTION: {
        type: String,
    },
    IMGURL: {
        type: String,
        default: 'https://via.placeholder.com/250x250.png?text=No+Image',
        required: false,
    },
});

module.exports = User = mongoose.model('User', schema);