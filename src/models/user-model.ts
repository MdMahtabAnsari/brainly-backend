import {Schema,model} from "mongoose";

const UserSchema = new Schema({
   username: {
         type: String,
         required: [true, 'Username is required'],
       unique: [true, 'Username already exists']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },

},{timestamps: true});

const User = model('User', UserSchema);

export default User;
