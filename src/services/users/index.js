import express from "express";
import UserModel from "../../db/models/users/UsersModel.js";

const { Router } = express;

const router = Router();



router
  .route("/")
  .post(async (req, res) => {
    try {
      const createUser = new UserModel(req.body);

      const {_id} = await createUser.save();

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

export default router