import supertest from "supertest";
import client from "../../database";
import app from "../../server";

const request = supertest(app);

describe("Testing orders with products endpoint", () => {
  let token: string;
  afterAll(async () => {
    //reset the sequence of orders table to start with 1
    const conn = await client.connect();
    const sql =
      "DELETE FROM orders_products;\n DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\n DELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;\n DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;";
    await conn.query(sql);
    conn.release();
  });

  it("Add new product to the order using '/api/orders/:order_id/products' POST", async () => {
    //create user and save the token
    let response = await request.post("/api/users").send({
      firstname: "Beshoy",
      lastname: "Morad",
      password: "123456",
    });
    //save the token for next requests
    token = (response.headers.authorization as string).split(" ")[1];

    response = await request
      .post("/api/orders")
      .send({
        user_id: "1",
        status: "active",
      })
      .set("authorization", "Bearer " + token);

    response = await request
      .post("/api/products")
      .send({
        name: "diode",
        price: 50,
        category: "electronics",
      })
      .set("authorization", "Bearer " + token);

    response = await request
      .post("/api/orders/1/products")
      .send({ product_id: 1, quantity: 5 })
      .set("authorization", "Bearer " + token);

    expect(response.statusCode).toEqual(200);
  });

  it("Try to add a product to order that doesn't exist", async () => {
    const response = await request
      .post("/api/orders/5/products")
      .send({ product_id: 1, quantity: 5 })
      .set("authorization", "Bearer " + token);

    expect(response.statusCode).toEqual(400);
  });

  it("Try to add a product that doesn't exist to an order", async () => {
    const response = await request
      .post("/api/orders/1/products")
      .send({ product_id: 4, quantity: 5 })
      .set("authorization", "Bearer " + token);

    expect(response.statusCode).toEqual(400);
  });

  it("Get the products in an order", async () => {
    const response = await request
      .get("/api/orders/1/products")
      .set("authorization", "Bearer " + token);

    expect(response.statusCode).toEqual(200);
  });

  it("Get the products in an order that doesn't exist", async () => {
    const response = await request
      .get("/api/orders/2/products")
      .set("authorization", "Bearer " + token);

    expect(response.statusCode).toEqual(400);
  });

  it("Try to get the products in order without JWT", async () => {
    const response = await request.get("/api/orders/1/products");

    expect(response.statusCode).toEqual(401);
  });

  it("Edit the quantity of the product for an order", async () => {
    const response = await request
      .put("/api/orders/1/products/1")
      .set("authorization", "Bearer " + token)
      .send({
        quantity: 1,
      });

    expect(response.statusCode).toEqual(200);
  });

  it("Try to remove a product from an order that doesn't exist", async () => {
    const response = await request
      .delete("/api/orders/4/products/1")
      .set("authorization", "Bearer " + token);

    expect(response.statusCode).toEqual(400);
  });

  it("Remove the product from an order", async () => {
    const response = await request
      .delete("/api/orders/1/products/1")
      .set("authorization", "Bearer " + token);

    expect(response.statusCode).toEqual(200);
  });
});
