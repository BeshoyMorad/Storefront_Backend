import client from "../../database";
import { OrderStore } from "../../models/order";
import { ProductStore } from "../../models/product";
import { UserStore } from "../../models/user";
import { Orders_ProductsStore } from "../../models/orders_products";

const orderStore = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();
const opStore = new Orders_ProductsStore();

describe("Orders_Products Model", () => {
  afterAll(async () => {
    //reset the sequence of orders table to start with 1
    const conn = await client.connect();
    const sql =
      "DELETE FROM orders_products;\n DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\n DELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;\n DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;";
    await conn.query(sql);
    conn.release();
  });

  it("should have an add product to order method", () => {
    expect(opStore.addProductToOrder).toBeDefined();
  });

  it("should have a remove product from order method", () => {
    expect(opStore.destroyProductFromOrder).toBeDefined();
  });

  it("should have an edit quantity of product method", () => {
    expect(opStore.editQuantityOfProduct).toBeDefined();
  });

  it("should have a products in order method", () => {
    expect(opStore.productsInOrder).toBeDefined();
  });

  it("Create method should add a product to an order", async () => {
    await userStore.create({
      firstname: "Beshoy",
      lastname: "Morad",
      password: "123456",
    });

    await orderStore.create({
      user_id: "1",
      status: "active",
    });

    await productStore.create({
      name: "diode",
      price: 50,
      category: "electronics",
    });

    const result = await opStore.addProductToOrder({
      order_id: "1",
      product_id: "1",
      quantity: 5,
    });

    expect(result).toEqual({
      order_id: "1",
      product_id: "1",
      quantity: 5,
    });
  });

  it("Get the correct product from an order", async () => {
    const result = await opStore.productsInOrder(1);

    expect(result).toContain({
      id: 1,
      name: "diode",
      category: "electronics",
      price: 50,
      quantity: 5,
    });
  });

  it("Edit the quantity of a product in an order", async () => {
    const result = await opStore.editQuantityOfProduct({
      order_id: "1",
      product_id: "1",
      quantity: 20,
    });

    expect(result).toEqual({
      order_id: "1",
      product_id: "1",
      quantity: 20,
    });
  });

  it("Remove a product from an order", async () => {
    await opStore.destroyProductFromOrder(1, 1);
    const result = await opStore.productsInOrder(1);
    expect(result).toEqual([]);
  });
});
