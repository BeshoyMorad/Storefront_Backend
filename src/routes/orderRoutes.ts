import express from "express";
import orderController from "../controllers/orderController";
import verifyAuthToken from "../middlewares/verifyAuthToken";

const order = express.Router();

order.get("/", verifyAuthToken, orderController.index);

order.get("/:id", verifyAuthToken, orderController.show);

order.post("/", verifyAuthToken, orderController.create);

order.put("/:id", verifyAuthToken, orderController.update);

order.delete("/:id", verifyAuthToken, orderController.destroy);

order.get(
  "/completed_orders/:user_id",
  verifyAuthToken,
  orderController.completedOrders
);

order.get(
  "/:order_id/products",
  verifyAuthToken,
  orderController.productsInOrder
);

order.post(
  "/:order_id/products",
  verifyAuthToken,
  orderController.addProductToOrder
);

order.put(
  "/:order_id/products/:product_id",
  verifyAuthToken,
  orderController.editQuantityOfProduct
);

order.delete(
  "/:order_id/products/:product_id",
  verifyAuthToken,
  orderController.destroyProductFromOrder
);

export default order;
