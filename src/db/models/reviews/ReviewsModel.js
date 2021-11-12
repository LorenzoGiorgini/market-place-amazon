import mongoose from 'mongoose';

const { Schema, model } = mongoose;



const ReviewsSchema = new Schema(
    {
        comment: {
            type: String,
            required: true
        }, 
        rate: {
            type: Number,
            required: true
        },
        createdBy: {type: Schema.Types.ObjectId , ref: "User"}
    },
    {
      timestamps: true,
    }
);
  
export default model("Review", ReviewsSchema);