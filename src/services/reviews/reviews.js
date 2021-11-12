import express from "express";
import ReviewModel from "../../db/models/reviews/ReviewsModel.js";
import ProductModel from "../../db/models/product/ProductModel.js";

const { Router } = express;

const reviewRouter = Router();

reviewRouter.get("/", async (req, res, next) => {
  try {
    const reviews = await ReviewModel.find().populate({ path: "reviews" });
    res.send(reviews);
  } catch (error) {
    next(error);
  }
});

//Creates the new review and pushes the ID of the new review to product.reviews array
reviewRouter.post("/:productId", async (req, res, next) => {
  try {
    const id = req.params.productId;

    const newReview = new ReviewModel(req.body);
    const newlyCreated = await newReview.save();
    //pushes the newly created id to the product reviews array
    const addToProductReviews = await ProductModel.findByIdAndUpdate(
      id,
      { $push: { reviews: newlyCreated._id } },
      { new: true }
    );
    res.status(201).send({ addToProductReviews });
  } catch (error) {
    next(error);
  }
});

reviewRouter.delete("/:reviewId", async (req, res, next) => {
  try {
    const { id } = req.params.reviewId;
    const review = await ReviewModel.findByIdAndDelete(id);
    res.status(201).send(review);
  } catch (error) {
    next(error);
  }
});

reviewRouter.put("/:reviewId", async (req, res, next) => {
  try {
    const id = req.params.reviewId;

    const updatedReview = await ReviewModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(201).send(updatedReview);
  } catch (error) {
    next(error);
  }
});
export default reviewRouter;
