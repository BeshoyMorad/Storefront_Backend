import express from "express";
import userController from "../controllers/userController";
import verifyAuthToken from "../middlewares/verifyAuthToken";

const user = express.Router();

user.get("/", verifyAuthToken, userController.index);

user.get("/:id", verifyAuthToken, userController.show);

user.post("/", userController.create);

user.post("/authenticate", userController.authenticate);

user.put("/:id", verifyAuthToken, userController.update);

user.delete("/:id", verifyAuthToken, userController.destroy);

user.get("/:user_id/orders", verifyAuthToken, userController.currentOrder);

export default user;
