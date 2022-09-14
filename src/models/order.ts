import client from "../database";

export type Order = {
  id?: number;
  user_id: string;
  status: string;
};

export class OrderStore {
  async create(o: Order): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO orders(user_id, status) VALUES($1, $2) RETURNING *;";

      const result = await conn.query(sql, [o.user_id, o.status]);

      const order = result.rows[0];
      conn.release();

      return order;
    } catch (error) {
      throw new Error(`Cannot add new order : ${error}`);
    }
  }

  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM orders;";

      const result = await conn.query(sql);

      const orders = result.rows;
      conn.release();

      return orders;
    } catch (error) {
      throw new Error(`Cannot index all orders : ${error}`);
    }
  }

  async show(id: string): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM orders WHERE id=$1;";

      const result = await conn.query(sql, [id]);

      const order = result.rows[0];
      conn.release();

      return order;
    } catch (error) {
      throw new Error(`Cannot get order with id ${id} : ${error}`);
    }
  }

  async update(o: Order): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql =
        "UPDATE orders SET user_id=$1, status=$2 WHERE id=$3 RETURNING *;";

      const result = await conn.query(sql, [o.user_id, o.status, o.id]);

      const order = result.rows[0];
      conn.release();

      return order;
    } catch (error) {
      throw new Error(`Cannot update order with id ${o.id} : ${error}`);
    }
  }

  async destroy(id: number): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = "DELETE FROM orders WHERE id=$1 RETURNING *;";

      const result = await conn.query(sql, [id]);

      const order = result.rows[0];
      conn.release();

      return order;
    } catch (error) {
      throw new Error(`Cannot delete order with id ${id} : ${error}`);
    }
  }

  async completedOrders(id: string): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql =
        "SELECT * FROM orders WHERE user_id=$1 AND status='complete';";

      const result = await conn.query(sql, [id]);

      const orders = result.rows;
      conn.release();

      return orders;
    } catch (error) {
      throw new Error(
        `Cannot find completed orders for user with id ${id} : ${error}`
      );
    }
  }

  async currentOrder(id: number): Promise<Order> {
    try {
      const conn = await client.connect();
      const userSql = "SELECT * FROM users WHERE id=$1;";
      const result = await conn.query(userSql, [id]);
      const user = result.rows[0];
      if (!user) {
        throw new Error(`Cannot not find user with id ${id}`);
      }
      conn.release();
    } catch (error) {
      throw new Error(`${error}`);
    }

    try {
      const conn = await client.connect();
      const userSql =
        "SELECT * FROM orders WHERE user_id=$1 AND status='active';";
      const result = await conn.query(userSql, [id]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (error) {
      throw new Error(`Cannot find orders for user with id ${id}`);
    }
  }
}
