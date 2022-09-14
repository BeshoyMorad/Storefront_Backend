import { Request, Response } from "express";
import { Order, OrderStore } from "../models/order";
import { DashboardQueries } from "../models/dashboard";

const store = new OrderStore();
const dashboard = new DashboardQueries();

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      user_id: req.body.user_id,
      status: req.body.status,
    };

    const newOrder = await store.create(order);

    res.json(newOrder);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
};

const index = async (_req: Request, res: Response) => {
  try {
    const orders = await store.index();

    res.json(orders);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const order = await store.show(req.params.id);
    if (!order) {
      res.status(404).send(`Cannot find order with id ${req.params.id}`);
    } else {
      res.json(order);
    }
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      id: Number(req.params.id),
      user_id: req.body.user_id,
      status: req.body.status,
    };

    const newOrder = await store.update(order);
    if (!newOrder) {
      res.status(404).send(`Cannot find order with id ${order.id}`);
    } else {
      res.json(newOrder);
    }
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const order = await store.destroy(id);

    if (!order) {
      res.status(404).send(`Cannot find order with id ${id}`);
    } else {
      res.json(order);
    }
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
};

const completedOrders = async (req: Request, res: Response) => {
  try {
    const orders = await store.completedOrders(req.params.user_id);

    if (!orders.length) {
      res
        .status(404)
        .send(`Cannot find orders for user with id ${req.params.user_id}`);
    } else {
      res.json(orders);
    }
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
};

const productsInOrder = async (req: Request, res: Response) => {
  try {
    const orders = await dashboard.productsInOrder(Number(req.params.order_id));

    if (!orders.length) {
      res
        .status(404)
        .send(`Cannot find products in order with id ${req.params.order_id}`);
    } else {
      res.json(orders);
    }
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
};

const addProductToOrder = async (req: Request, res: Response) => {
  try {
    const order = await dashboard.addProductToOrder(
      Number(req.body.order_id),
      Number(req.body.product_id),
      Number(req.body.quantity)
    );
    res.json(order);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
};

const editQuantityOfProduct = async (req: Request, res: Response) => {
  try {
    const order = await dashboard.editQuantityOfProduct(
      Number(req.params.order_id),
      Number(req.params.product_id),
      Number(req.body.quantity)
    );
    if (!order) {
      res
        .status(404)
        .send(`Cannot find product with id ${req.params.product_id}`);
    } else {
      res.json(order);
    }
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
};

const destroyProductFromOrder = async (req: Request, res: Response) => {
  try {
    const order = await dashboard.destroyProductFromOrder(
      Number(req.params.order_id),
      Number(req.params.product_id)
    );
    if (!order) {
      res
        .status(404)
        .send(`Cannot find product with id ${req.params.product_id}`);
    } else {
      res.json(order);
    }
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
};

export default {
  create,
  index,
  show,
  update,
  destroy,
  completedOrders,
  productsInOrder,
  addProductToOrder,
  editQuantityOfProduct,
  destroyProductFromOrder,
};
