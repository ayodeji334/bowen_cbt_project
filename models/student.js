import mongoose from 'mongoose'
const Schema = mongoose.Schema

const studentSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    firstname: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    matric_number: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    college: {
        type: String,
        required: true,
    },
    dept: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.models.Student || mongoose.model('Student', studentSchema);