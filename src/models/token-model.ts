import {Schema,model,Types} from "mongoose";
import serverConfig from "../configs/server-config";

const tokenSchema = new Schema({
    token: {
        type: String,
        required: [true, 'Token is required']
    },
    userId:{
        type:Types.ObjectId,
        ref:'User',
        unique:[true,'User can have only one token'],
        required:[true,'User is required']
    },

},{timestamps:true});

tokenSchema.index({userId: 1},{unique: true});

tokenSchema.index({createdAt: 1},{expireAfterSeconds: serverConfig.REFRESH_TOKEN_EXPIRY/1000});



const Token = model('Token', tokenSchema);


export default Token;