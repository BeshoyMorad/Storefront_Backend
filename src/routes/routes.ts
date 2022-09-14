import express from "express";

//routes
import user from "./userRoutes";
import product from "./productRoutes";
import order from "./orderRoutes";

const routes = express.Router();

routes.use("/users", user);
routes.use("/products", product);
routes.use("/orders", order);

export default routes;
