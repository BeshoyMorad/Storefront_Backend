import express from "express";
import orderController from "../controllers/orderController";

const order = express.Router();

order.get("/", orderController.index);

order.get("/:user_id", orderController.show);

order.post("/", orderController.create);

order.put("/:id", orderController.update);

order.delete("/:id", orderController.destroy);

order.get("/completed_orders/:user_id", orderController.completedOrders);

export default order;
