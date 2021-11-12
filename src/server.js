import express from "express";
import mongoose from "mongoose";
import listEndpoints from "express-list-endpoints";


//routes for the api
import productRouter from "./services/products/index.js";
import userRoutes from "./services/users/index.js";
import reviewsRoutes from "./services/reviews/reviews.js";
import cartRoutes from "./services/cart/cart.js"


const server = express();

const port = process.env.PORT || 3001;

//middlewares
server.use(express.json());

//routes
server.use("/product", productRouter);
server.use("/users", userRoutes);
server.use("/reviews", reviewsRoutes);
server.use("/cart", cartRoutes);


mongoose.connect(process.env.MONGO_URL);

mongoose.connection.on("connected", () => {
  server.listen(port, () => {
    console.table(listEndpoints(server));
  });
});