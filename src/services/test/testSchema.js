const { Schema } = require('mongoose'),
    mongoose = require('mongoose')

const testSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    contactNumber: { type: Number, required: true}
},
{timestamps : true}
)

module.exports = mongoose.model('TEST', testSchema)