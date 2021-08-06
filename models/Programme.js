import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const programmeSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('programmes', programmeSchema);