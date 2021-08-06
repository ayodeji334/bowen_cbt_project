import mongoose from 'mongoose';

const { Schema } = mongoose;

 const collegeSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    abbreviation: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.models?.College || mongoose.model('College', collegeSchema);