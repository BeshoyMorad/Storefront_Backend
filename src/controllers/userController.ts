import { Request, Response } from "express";
import { User, UserStore } from "../models/user";
import { OrderStore } from "../models/order";

const store = new UserStore();
const orderStore = new OrderStore();

const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
    };

    const newUser = await store.create(user);

    //JWT here

    res.json(newUser);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
};

const index = async (_req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const user = await store.show(id);
    if (!user) {
      res.status(404).send(`Cannot find user with id ${id}`);
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const user: User = {
      id: Number(req.params.id),
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
    };

    const newUser = await store.update(user);
    if (!newUser) {
      res.status(404).send(`Cannot find user with id ${user.id}`);
    } else {
      res.json(newUser);
    }
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const user = await store.destroy(id);
    if (!user) {
      res.status(404).send(`Cannot find user with id ${id}`);
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
};

const authenticate = async (req: Request, res: Response) => {
  try {
    const user: User = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
    };
    const newUser = await store.authenticate(user);
    if (!newUser) {
      res.status(401).send("Wrong name or password");
    } else {
      res.json(newUser);
    }
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
};

const currentOrder = async (req: Request, res: Response) => {
  try {
    const order = await orderStore.currentOrder(Number(req.params.user_id));
    if (!order) {
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

export default {
  create,
  index,
  show,
  update,
  destroy,
  authenticate,
  currentOrder,
};
