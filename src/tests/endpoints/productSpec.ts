import supertest from "supertest";
import client from "../../database";
import app from "../../server";

const request = supertest(app);

describe("Testing product endpoint", () => {
  let token: string;

  afterAll(async () => {
    //reset the sequence of products table to start with 1
    const conn = await client.connect();
    const sql =
      "DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;";
    await conn.query(sql);
    conn.release();
  });

  it("Create a new product using '/api/products' POST", async () => {
    //create user and save the token
    let response = await request.post("/api/users").send({
      firstname: "Beshoy",
      lastname: "Morad",
      password: "123456",
    });
    //save the token for next requests
    token = (response.headers.authorization as string).split(" ")[1];

    response = await request
      .post("/api/products")
      .send({
        name: "diode",
        price: 50,
        category: "electronics",
      })
      .set("authorization", "Bearer " + token);

    expect(response.statusCode).toEqual(200);
  });

  it("Index all the products using '/api/products' GET", async () => {
    const response = await request.get("/api/products");

    expect(response.statusCode).toEqual(200);
  });

  it("Show product with id = 1 '/api/products/1'", async () => {
    const response = await request.get("/api/products/1");

    expect(response.statusCode).toEqual(200);
  });

  it("Try to get product don't exist", async () => {
    const response = await request.get("/api/products/5");

    expect(response.statusCode).toEqual(404);
  });

  it("Update the product with id = 1", async () => {
    const response = await request
      .put("/api/products/1")
      .set("authorization", "Bearer " + token)
      .send({
        name: "diode",
        price: 40,
        category: "electronics",
      });

    expect(response.statusCode).toEqual(200);
  });

  it("Try to update a product doesn't exist", async () => {
    const response = await request
      .put("/api/products/5")
      .set("authorization", "Bearer " + token)
      .send({
        name: "diode",
        price: 40,
        category: "electronics",
      });

    expect(response.statusCode).toEqual(404);
  });

  it("Try to update a product with no JWT", async () => {
    const response = await request.put("/api/products/1").send({
      name: "diode",
      price: 30,
      category: "electronics",
    });

    expect(response.statusCode).toEqual(401);
  });

  it("Get the products with category = electronics", async () => {
    const response = await request.get("/api/products/electronics");

    expect(response.statusCode).toEqual(200);
  });

  it("Try to get products with category dosen't exist", async () => {
    const response = await request.get("/api/products/fruits");

    expect(response.statusCode).toEqual(404);
  });

  it("Try to delete a product doesn't exist", async () => {
    const response = await request
      .delete("/api/products/5")
      .set("authorization", "Bearer " + token);

    expect(response.statusCode).toEqual(404);
  });

  it("Delete a product with id = 1", async () => {
    const response = await request
      .delete("/api/products/1")
      .set("authorization", "Bearer " + token);

    expect(response.statusCode).toEqual(200);
  });
});
