import express from "express";
import userController from "../controllers/userController";

const user = express.Router();

user.get("/", userController.index);

user.get("/:id", userController.show);

user.post("/", userController.create);

user.put("/:id", userController.update);

user.delete("/:id", userController.destroy);

export default user;
