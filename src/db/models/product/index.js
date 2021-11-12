import express from "express";
import createHttpError from "http-errors";
import ProductModel from "./ProductModel.js";

const productRouter = express.Router();

//Gets all products
productRouter.get("/", async (req, res, next) => {
  try {
    const products = await productModel.find();
    res.send(products);
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

//Delete a product
productRouter.delete("/:productId", async (req, res, next) => {
  try {
    const { id } = req.params.productId;
    const product = await ProductModel.findByIdAndDelete(id);
    if (!product) {
      throw createHttpError(404, `Product with ID: ${id} is deleted`);
    }
    res.send(product);
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