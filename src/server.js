import express from "express";
import mongoose from "mongoose";
import listEndpoints from "express-list-endpoints";

//routes for the api
import reviewsRoutes from "./services/reviews/reviews.js";


const server = express();


const port = process.env.PORT || 3001


//middlewares

server.use(express.json());


//routes

server.use("/reviews", reviewsRoutes);



mongoose.connect(process.env.MONGO_URL)

mongoose.connection.on('connected', () => {
    server.listen(port, () => {
        console.table(listEndpoints(server))
    })
})