import express from "express";
import ReviewsModel from "../../db/models/reviews/ReviewsModel.js";

const { Router } = express;

const router = Router();



router
  .route("/")
  .post(async (req, res) => {
    try {
      const review = new ReviewsModel(req.body);

      const {_id} = await review.save();

      res.status(201).send({success: true, data: _id});

    } catch (error) {
      res.status(500).send({success: false, message: error.message});

    }
  })
  .get(async (req, res) => {

    try {
      const getAllReviews = await ReviewsModel.find();

      if (getAllReviews) {
        res.status(200).send({success: true, data: getAllReviews});
        
      } else {
        res.status(404).send({success: false, message: "No reviews found"});

      }
    } catch (error) {
      res.status(500).send({success: false, message: error.message});

    }
  });




router
  .route("/:reviewId")
  .get(async (req, res) => {

    try {

      const getAllReviewsById = await ReviewsModel.findById(req.params.reviewId);

      if(getAllReviewsById) {
        res.status(200).send({success: true, data: getAllReviewsById});

      } else {
        res.status(404).send({success: false, message: "No review with the id provided found"});

      }
      
    } catch (error) {
      res.status(500).send({success: false, message: error.message})

    }

  })
  .put(async (req, res) => {

    try {

      const modifyedReview = await ReviewsModel.findByIdAndUpdate(req.params.reviewId, req.body, {new: true});

      if(modifyedReview) {
        res.status(203).send({success: true, data: modifyedReview});

      } else {
        res.status(404).send({success: false, message: "No review with the id provided found"})

      }
      
    } catch (error) {
      res.status(500).send({success: false, message: error.message})
      
    }

  })
  .delete(async (req, res) => {

    try {

      const deleteReviewById = await ReviewsModel.findByIdAndDelete(req.params.reviewId);

      if(deleteReviewById) {
        res.status(204).send({success: true, message: "Review deleted successfully"});

      } else {
        res.status(404).send({success: false, message: "No review with the id provided found"})

      }
      
    } catch (error) {
      res.status(500).send({success: false, message: error.message})

    }

  });


export default router