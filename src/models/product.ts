import client from "../database";

export type Product = {
  id?: number;
  name: string;
  price: number;
  category: string;
};

export class ProductStore {
  async create(p: Product): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO products(name, price, category) VALUES($1, $2, $3) RETURNING *;";

      const result = await conn.query(sql, [p.name, p.price, p.category]);

      const product = result.rows[0];
      conn.release();

      return product;
    } catch (error) {
      throw new Error(`Cannot add new product ${p.name} : ${error}`);
    }
  }

  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM products;";

      const result = await conn.query(sql);

      const products = result.rows;
      conn.release();

      return products;
    } catch (error) {
      throw new Error(`Cannot index all products : ${error}`);
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM products WHERE id=$1;";

      const result = await conn.query(sql, [id]);

      const product = result.rows[0];
      conn.release();

      return product;
    } catch (error) {
      throw new Error(`Cannot get product with id ${id} : ${error}`);
    }
  }

  async update(p: Product): Promise<Product> {
    try {
      const conn = await client.connect();

      const sql =
        "UPDATE products SET name=$1, price=$2, category=$3 WHERE id=$4 RETURNING *;";

      const result = await conn.query(sql, [p.name, p.price, p.category, p.id]);

      const product = result.rows[0];
      conn.release();

      return product;
    } catch (error) {
      throw new Error(`Cannot update product ${p.name} : ${error}`);
    }
  }

  async destroy(id: number): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = "DELETE FROM products WHERE id=$1;";

      const result = await conn.query(sql, [id]);

      const product = result.rows[0];
      conn.release();

      return product;
    } catch (error) {
      throw new Error(`Cannot delete product with id ${id} : ${error}`);
    }
  }
}
