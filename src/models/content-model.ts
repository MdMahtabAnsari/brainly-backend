import {Schema,model,Types} from "mongoose";

const contentTypes = ['image', 'video', 'text', 'audio']

const contentSchema = new Schema({
    link: {
        type: String,
        require: [true, 'Link is required']
    },
    type: {
        type: String,
        enum: contentTypes,
        required: [true, 'Content type is required']

    },
    title: {
        type: String,
       require:[true, 'Title is required']

    },
    tags:{
        type:[{
            type: Types.ObjectId,
            ref:'Tag'
        }],
        default: []
    },
    userId:{
        type:Types.ObjectId,
        ref:'User',
        require:[true, 'User id is required']
    }
},{timestamps: true});

const Content = model('Content', contentSchema);

export default Content;
