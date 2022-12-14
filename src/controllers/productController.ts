import { Request, Response } from "express";
import { Product, ProductStore } from "../models/product";

const store = new ProductStore();

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: Number(req.body.price),
      category: req.body.category,
    };

    const newProduct = await store.create(product);

    res.json(newProduct);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
};

const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      const products = await store.withCategory(req.params.id);
      if (!products.length) {
        res
          .status(404)
          .send(`Cannot find products with category ${req.params.id}`);
      } else {
        res.json(products);
      }
    } else {
      const product = await store.show(id);
      if (!product) {
        res.status(404).send(`Cannot find product with id ${id}`);
      } else {
        res.json(product);
      }
    }
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      id: Number(req.params.id),
      name: req.body.name,
      price: Number(req.body.price),
      category: req.body.category,
    };

    const newProduct = await store.update(product);
    if (!newProduct) {
      res.status(404).send(`Cannot find product with id ${product.id}`);
    } else {
      res.json(newProduct);
    }
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const product = await store.destroy(id);

    if (!product) {
      res.status(404).send(`Cannot find product with id ${id}`);
    } else {
      res.json(product);
    }
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
};

export default { create, index, show, update, destroy };
