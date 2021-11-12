import express from "express";
import UserModel from "../../db/models/users/UsersModel.js";

const { Router } = express;

const router = Router();



router
  .route("/")
  .post(async (req, res) => {
    try {
      const createUser = new UserModel(req.body);

      const {_id} = await review.save();

      res.status(201).send({success: true, data: _id});

    } catch (error) {
      res.status(500).send({success: false, message: error.message});

    }
  })
  .get(async (req, res) => {

    try {
      const getAllTheUsers = await UserModel.find();

      if (getAllTheUsers) {
        res.status(200).send({success: true, data: getAllTheUsers});
        
      } else {
        res.status(404).send({success: false, message: "No users found"});

      }
    } catch (error) {
      res.status(500).send({success: false, message: error.message});

    }
  });




router
  .route("/:userId")
  .get(async (req, res) => {

    try {

      const getAllTheUsersById = await UserModel.findById(req.params.userId);

      if(getAllTheUsersById) {
        res.status(200).send({success: true, data: getAllTheUsersById});

      } else {
        res.status(404).send({success: false, message: "No User with the id provided found"});

      }
      
    } catch (error) {
      res.status(500).send({success: false, message: error.message})

    }

  })
  .put(async (req, res) => {

    try {

      const modifyedUser = await UserModel.findByIdAndUpdate(req.params.userId, req.body, {new: true});

      if(modifyedUser) {
        res.status(203).send({success: true, data: modifyedUser});

      } else {
        res.status(404).send({success: false, message: "No User with the id provided found"})

      }
      
    } catch (error) {
      res.status(500).send({success: false, message: error.message})
      
    }

  })
  .delete(async (req, res) => {

    try {

      const deleteUser = await UserModel.findByIdAndDelete(req.params.userId);

      if(deleteUser) {
        res.status(204).send({success: true, message: "User deleted successfully"});

      } else {
        res.status(404).send({success: false, message: "No user with the id provided found"})

      }
      
    } catch (error) {
      res.status(500).send({success: false, message: error.message})

    }

  });



  //REVIEW ENDPOINTS
  router
  .route("/:userId/review")
  .post(async (req, res, next) => {
    try {
      const id = req.params.userId
      const user = await UserModel.findById(id,  { _id: 0 })
      //this grabs the specific user that has the reviews document nested inside
  
      const newReviw = req.body
      //the data for the Review is in the req body
  
      if (user) {
        const addReviw = await UserModel.findByIdAndUpdate(id, { $push: { review: newReview}   }, {new: true} )
        res.send(addReview)
  
  
      } else {
        next(createHttpError(404, `User with the ID: ${req.params.userId} not found!`))
      }
  
    } catch (error) {
      next(error)
    }
  })


  //GET ALL REVIEWS
  .get(async (req, res, next) => {
  try {
    const id = req.params.userId

    const user = await UserModel.findById(id)
    if (user) {
      res.send(user.reviews)
    } else {
      next(createHttpError(404, `User with the ID:  ${id} not found!`))
    }
  } catch (error) {
    next(error)
  }
})

export default router