import supertest from "supertest";
import client from "../../database";
import app from "../../server";

const request = supertest(app);

fdescribe("Testing order endpoint", () => {
  let token: string;
  afterAll(async () => {
    //reset the sequence of orders table to start with 1
    const conn = await client.connect();
    const sql =
      "DELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;\n DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;";
    await conn.query(sql);
    conn.release();
  });

  it("Create a new order using '/api/orders' POST", async () => {
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
        status: "complete",
      })
      .set("authorization", "Bearer " + token);

    expect(response.statusCode).toEqual(200);
  });

  it("Index all the orders using '/api/products' GET", async () => {
    const response = await request
      .get("/api/orders")
      .set("authorization", "Bearer " + token);

    expect(response.statusCode).toEqual(200);
  });

  it("Show order with id = 1 '/api/products/1'", async () => {
    const response = await request
      .get("/api/orders/1")
      .set("authorization", "Bearer " + token);

    expect(response.statusCode).toEqual(200);
  });

  it("Try to get order dosen't exist", async () => {
    const response = await request
      .get("/api/orders/5")
      .set("authorization", "Bearer " + token);

    expect(response.statusCode).toEqual(404);
  });

  it("Update the order with id = 1", async () => {
    const response = await request
      .put("/api/orders/1")
      .set("authorization", "Bearer " + token)
      .send({
        user_id: "1",
        status: "active",
      });

    expect(response.statusCode).toEqual(200);
  });

  it("Try to update a order doesn't exist", async () => {
    const response = await request
      .put("/api/orders/5")
      .set("authorization", "Bearer " + token)
      .send({
        user_id: "1",
        status: "active",
      });

    expect(response.statusCode).toEqual(404);
  });

  it("Try to update a product with no JWT", async () => {
    const response = await request.put("/api/orders/1").send({
      user_id: "1",
      status: "complete",
    });

    expect(response.statusCode).toEqual(401);
  });

  it("Get the current order by user", async () => {
    const response = await request
      .get("/api/users/1/orders")
      .set("authorization", "Bearer " + token);

    expect(response.statusCode).toEqual(200);
  });

  it("Get the current order by user doesn't exist", async () => {
    const response = await request
      .get("/api/users/5/orders")
      .set("authorization", "Bearer " + token);

    expect(response.statusCode).toEqual(400);
  });

  it("Get the completed orders for a user", async () => {
    let response = await request
      .put("/api/orders/1")
      .set("authorization", "Bearer " + token)
      .send({
        user_id: "1",
        status: "complete",
      });

    response = await request
      .get("/api/orders/completed_orders/1")
      .set("authorization", "Bearer " + token);

    expect(response.statusCode).toEqual(200);
  });

  it("Try to delete an order doesn't exist", async () => {
    const response = await request
      .delete("/api/orders/5")
      .set("authorization", "Bearer " + token);

    expect(response.statusCode).toEqual(404);
  });

  it("Delete an order with id = 1", async () => {
    const response = await request
      .delete("/api/orders/1")
      .set("authorization", "Bearer " + token);

    expect(response.statusCode).toEqual(200);
  });
});
