const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Please provide company name'],
        maxlength:50
    },
    position: {
        type: String,
        required: [true, 'Please provide position'],
        maxlength:100
    },
    status: {
        type: String,
        enum: ['interview', 'declined','pending'],
        default: 'pending'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',//model
        required: [true,'Please provide a user']
    }
},{ timestamps: true })//ira en el res


module.exports = mongoose.model('Job', JobSchema)
