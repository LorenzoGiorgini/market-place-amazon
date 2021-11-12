import express from "express";

const { Router } = express;

import ProductModel from "../../db/models/product/ProductModel.js";
import CartModel from "../../db/models/cart/CartModel.js";

const router = Router();

router.route("/:userId/addToCart").post(async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const purchasedProduct = await ProductModel.findById(productId);

    console.log(purchasedProduct);

    if (purchasedProduct) {
      const productAlreadyInCart = await CartModel.findOne({
        ownerId: req.params.userId,
        status: "active",
        "products._id": purchasedProduct._id,
      });

      if (productAlreadyInCart) {
        const cart = await CartModel.findOneAndUpdate(
          {
            ownerId: req.params.userId,
            status: "active",
            "products._id": purchasedProduct._id,
          },
          {
            $inc: { "products.$.quantity": quantity },
          },
          {
            new: true,
          }
        );
        res.send(cart);
      } else {
        const productToInsert = { ...purchasedProduct.toObject(), quantity };

        const cart = await CartModel.findOneAndUpdate(
          { ownerId: req.params.userId, status: "active" },
          {
            $push: { products: productToInsert },
          },
          {
            new: true,
            upsert: true,
          }
        );

        res.send(cart);
      }
    } else {
      res.status(404).send({ success: false, message: "Product Not Found" });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

//gets cart by user id
router.route("/:userId").get(async (req, res) => {
  try {
    const id = req.params.userId;
    const getCart = await CartModel.find({ ownerId: id }, { status: "active" });
    if (getCart) {
      res.send(getCart);
    } else {
      res.send(`Cart for the user ${id} not found`);
    }
  } catch (error) {
    res.status(500).send();
  }
});

export default router;
