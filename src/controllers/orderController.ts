import { Request, Response } from "express";
import { Order, OrderStore } from "../models/order";

const store = new OrderStore();

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
    const order = await store.show(req.params.user_id);
    if (!order) {
      res
        .status(404)
        .send(`Cannot find order for user with id ${req.params.user_id}`);
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
    const order = await store.completedOrders(req.params.user_id);

    if (!order.length) {
      res
        .status(404)
        .send(`Cannot find orders for user with id ${req.params.user_id}`);
    } else {
      res.json(order);
    }
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
};

export default { create, index, show, update, destroy, completedOrders };
