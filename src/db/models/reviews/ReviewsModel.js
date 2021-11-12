import mongoose from 'mongoose';

const { Schema, model } = mongoose;



/* {
    "_id": "123455", //SERVER GENERATED
    "comment": "A good book but definitely I don't like many parts of the plot", //REQUIRED
    "rate": 3, //REQUIRED, max 5
    "productId": "5d318e1a8541744830bef139", //REQUIRED reference to Products Table
    "createdAt": "2019-08-01T12:46:45.895Z"  //SERVER GENERATED
} */


const ReviewsSchema = new Schema({
    comment: {
        type: String,
        required: true
    }, 
    rate: {
        type: Number,
        required: true
    },
    productId: {
        type: String,
        required: true
    }
}, { 
    timestamps: true 
});



export default model('Review', ReviewsSchema);