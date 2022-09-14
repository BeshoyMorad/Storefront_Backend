import express from "express";
import productController from "../controllers/productController";

const product = express.Router();

product.get("/", productController.index);

product.get("/:id", productController.show);

product.post("/", productController.create);

product.put("/:id", productController.update);

product.delete("/:id", productController.destroy);

export default product;
