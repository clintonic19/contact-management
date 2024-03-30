const mongoose = require("mongoose")

const contactShema = mongoose.Schema({

    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },

    name: {
        type: String,
        required: [true, "Please contact name is required."]
    },

    email: {
        type: String,
        required: [true, "Please email is required."]
    },

    phone_number: {
        type: String,
        required: [true, "Please phone number is required."]
    },
}, 
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Contact", contactShema);