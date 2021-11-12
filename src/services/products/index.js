import express from "express";
import createHttpError from "http-errors";
import ProductModel from "../../db/models/product/ProductModel.js";
import ReviewModel from "../../db/models/reviews/ReviewsModel.js";

import q2m from "query-to-mongo";

import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Products-Images",
  },
});

/**
 *   reivews as seperate schema for
 *     reviews has createdBy --> ref user id
 *
 *    /product/:id/reviews POST
 *           create review for product
 *             push only the review id to products.reviews array
 *            await Products.find([]).populate({path:"reviews",populate:{path:"createdBy","select":"firstNAme, lastNAme"}})
 *
 *
 *
 */

const productRouter = express.Router();

//Gets all products
productRouter.get("/", async (req, res, next) => {
  try {
    const query = q2m(req.query);

    const total = await ProductModel.countDocuments(query.criteria);

    const products = await ProductModel.find(query.criteria)
      .populate({
        path: "reviews",
        populate: { path: "createdBy", select: "name surname" },
      })
      .limit(query.options.limit)
      .skip(query.options.skip)
      .sort(query.criteria.category);

    res.send({
      totalPages: Math.ceil(total / query.options.limit),
      links: query.links("/products", total),
      products: products,
      totalProducts: total,
    });
  } catch (error) {
    next(error);
  }
});

//Creates a new Product
productRouter.post("/", async (req, res, next) => {
  try {
    const newProduct = new ProductModel(req.body);
    const { _id } = await newProduct.save();
    res.status(201).send({ _id });
  } catch (error) {
    next(error);
  }
});

//Creates a new Product
productRouter.put(
  "/:productId/uploadImage",
  multer({ storage: cloudinaryStorage }).single("imageUrl"),
  async (req, res, next) => {
    try {
      const newProduct = await ProductModel.findByIdAndUpdate(
        req.params.productId,
        { ...req.body, imageUrl: req.file.path },
        { new: true }
      );

      const { _id } = await newProduct.save();

      res.status(201).send({ _id });
    } catch (error) {
      next(error);
    }
  }
);

//Delete a product
productRouter.delete("/:productId", async (req, res, next) => {
  try {
    const { id } = req.params.productId;
    const product = await ProductModel.findByIdAndDelete(id);

    res.status(204).send({ success: true, message: "Product deleted" });
  } catch (error) {
    next(error);
  }
});

//GETS a specific product
productRouter.get("/:productId", async (req, res, next) => {
  try {
    const id = req.params.productId;

    const product = await ProductModel.findById(id);
    if (product) {
      res.send(product);
    } else {
      next(createHttpError(404, `product with the ID:  ${id} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

//gets all the reviews from a specific product
productRouter.get("/:productId/reviews", async (req, res, next) => {
  try {
    const id = req.params.productId;

    const product = await ProductModel.findById(id).populate({
      path: "reviews",
      populate: { path: "createdBy", select: "name surname" },
    });
    if (product) {
      res.send(product.reviews);
    } else {
      next(createHttpError(404, `product with the ID:  ${id} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

productRouter.put("/:productId", async (req, res, next) => {
  try {
    const id = req.params.productId;

    const updatedProduct = await ProductModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (updatedProduct) {
      res.send(updatedProduct);
    } else {
      next(createHttpError(404, `product with the ID:  ${id} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

export default productRouter;
