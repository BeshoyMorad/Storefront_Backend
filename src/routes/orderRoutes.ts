import express from "express";
import orderController from "../controllers/orderController";

const order = express.Router();

order.get("/", orderController.index);

order.get("/:id", orderController.show);

order.post("/", orderController.create);

order.put("/:id", orderController.update);

order.delete("/:id", orderController.destroy);

order.get("/completed_orders/:user_id", orderController.completedOrders);

order.get("/:order_id/products", orderController.productsInOrder);

order.post("/:order_id/products", orderController.addProductToOrder);

order.put(
  "/:order_id/products/:product_id",
  orderController.editQuantityOfProduct
);

order.delete(
  "/:order_id/products/:product_id",
  orderController.destroyProductFromOrder
);

export default order;
