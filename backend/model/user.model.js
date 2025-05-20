import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    // Add other fields as needed, for example:
    // name: {
    //   type: String,
    //   required: true,
    // },
    // role: {
    //   type: String,
    //   enum: ['user', 'admin'],
    //   default: 'user',
    // },
});

const User = mongoose.model('User', UserSchema);

export default User;