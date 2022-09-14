import express from "express";
import productController from "../controllers/productController";
import verifyAuthToken from "../middlewares/verifyAuthToken";

const product = express.Router();

product.get("/", productController.index);

product.get("/:id", productController.show);

product.post("/", verifyAuthToken, productController.create);

product.put("/:id", verifyAuthToken, productController.update);

product.delete("/:id", verifyAuthToken, productController.destroy);

export default product;
