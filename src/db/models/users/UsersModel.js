import mongoose from 'mongoose';


const { Schema , model } = mongoose;



const UserModel = new Schema({

    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
}, {
    timestamps : true
});


export default model("User" , UserModel)