import mongoose from "mongoose";

const { Schema, model } = mongoose;

/* PRODUCT LOOKS LIKE THIS : 
{
 "_id": "5d318e1a8541744830bef139", //SERVER GENERATED
  "name": "app test 1",  //REQUIRED
  "description": "somthing longer", //REQUIRED
  "brand": "nokia", //REQUIRED
  "imageUrl": "https://drop.ndtv.com/TECH/product_database/images/2152017124957PM_635_nokia_3310.jpeg?downsize=*:420&output-quality=80", //REQUIRED
  "price": 100, //REQUIRED
  "category": "smartphones"  
  "createdAt": "2019-07-19T09:32:10.535Z", //SERVER GENERATED
  "updatedAt": "2019-07-19T09:32:10.535Z", //SERVER GENERATED
  }  
   */

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    review: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  },
  {
    timestamps: true,
  }
);

export default model("Product", productSchema);

