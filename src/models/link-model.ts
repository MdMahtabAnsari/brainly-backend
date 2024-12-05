import {Schema,model,Types} from "mongoose";

const linkSchema = new Schema({
    hash:{
        type:String,
        required:[true,'Hash is required'],
        unique:[true,'Hash must be unique']
    },
    userId:{
        type:Types.ObjectId,
        ref:'User',
        unique:[true,'User id is required'],
        require:[true, 'User id is required']
    }
},{timestamps:true});

const Link = model('Link', linkSchema);

export default Link;