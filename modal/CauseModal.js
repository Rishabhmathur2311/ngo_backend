import mongoose from "mongoose";

const CauseSchema=new mongoose.Schema({


    ngoName:{
        type: String,
    },


    title:{
        type: String,
    },

    description: {
        type: String
    },

    UPI:{
        type: String
    },

    type:{
        type: String
    },

    address:{
        type: String
    },
    proof: {
        type: String
    },
    photo: {
        type: String
    },

    amount: {
        type: Number
    },

    city: {
        type: String
    },

    state: {
        type: String
    }
}, {
    timestamps: true
})

const Cause=mongoose.model('Cause', CauseSchema);

export default Cause;