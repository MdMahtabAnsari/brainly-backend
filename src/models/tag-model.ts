import {Schema,model} from "mongoose";

const tagSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        unique: true
    }
},{timestamps: true});


const Tag = model('Tag', tagSchema);

export default Tag;