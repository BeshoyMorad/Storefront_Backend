import client from "../../database";
import { ProductStore } from "../../models/product";

const store = new ProductStore();

describe("Product Model", () => {
  afterAll(async () => {
    //reset the sequence of products table to start with 1
    const conn = await client.connect();
    const sql =
      "DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;";
    await conn.query(sql);
    conn.release();
  });

  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(store.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(store.create).toBeDefined();
  });

  it("should have a update method", () => {
    expect(store.update).toBeDefined();
  });

  it("should have a delete method", () => {
    expect(store.destroy).toBeDefined();
  });

  it("create method should add a product", async () => {
    const result = await store.create({
      name: "Product1",
      category: "testingCategory",
      price: 50,
    });

    expect(result).toEqual(
      jasmine.objectContaining({
        name: "Product1",
        category: "testingCategory",
        price: 50,
      })
    );
  });

  it("index method should return a list of products", async () => {
    const result = await store.index();
    expect(result).toContain(
      jasmine.objectContaining({
        name: "Product1",
        category: "testingCategory",
        price: 50,
      })
    );
  });

  it("show method should return the correct product", async () => {
    const result = await store.show(1);
    expect(result).toEqual(
      jasmine.objectContaining({
        name: "Product1",
        category: "testingCategory",
        price: 50,
      })
    );
  });

  it("delete method should remove the product", async () => {
    await store.destroy(1);
    const result = await store.index();

    expect(result).toEqual([]);
  });
});
