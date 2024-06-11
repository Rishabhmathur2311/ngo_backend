import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    name:{
        type: String,
    },

    email: {
        type: String
    },

    password:{
        type: String
    },

    mobile:{
        type: String
    },

    weight: {
        type: String
    },

    height: {
        type: String
    },

    age: {
        type: String
    },

    gender: {
        type: String
    },

    profile:{
        type: String
    },
}, {
    timestamps: true
})

const User=mongoose.model('User', UserSchema);

export default User;