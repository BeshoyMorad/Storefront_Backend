import client from "../database";

export class DashboardQueries {
  async productsInOrder(order_id: number): Promise<
    {
      id: number;
      name: string;
      category: string;
      price: number;
      quantity: number;
    }[]
  > {
    try {
      const conn = await client.connect();
      const orderSql = "SELECT * FROM orders WHERE id=$1";

      const result = await conn.query(orderSql, [order_id]);
      const order = result.rows[0];

      if (!order) {
        throw new Error(`Cannot not find order with id ${order_id}`);
      }
      conn.release();
    } catch (error) {
      throw new Error(`${error}`);
    }
    try {
      const conn = await client.connect();
      const sql =
        "SELECT id, name, category, price, quantity FROM products INNER JOIN orders_products ON products.id = orders_products.product_id WHERE order_id=$1;";

      const result = await conn.query(sql, [order_id]);

      const products = result.rows;
      conn.release();

      return products;
    } catch (error) {
      throw new Error(
        `Cannot find products in order with id ${order_id} : ${error}`
      );
    }
  }

  async addProductToOrder(
    order_id: number,
    product_id: number,
    quantity: number
  ): Promise<{ product_id: number; order_id: number; quantity: number }> {
    try {
      const conn = await client.connect();
      const orderSql = "SELECT * FROM orders WHERE id=$1";

      const result = await conn.query(orderSql, [order_id]);
      const order = result.rows[0];

      if (!order) {
        throw new Error(`Cannot not find order ${order_id}`);
      }
      if (order.status !== "active") {
        throw new Error(
          `Cannot not add product ${product_id} to order ${order_id} because order status is ${order.status}`
        );
      }
      conn.release();
    } catch (error) {
      throw new Error(`${error}`);
    }
    try {
      const sql =
        "INSERT INTO orders_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *;";
      const conn = await client.connect();

      const result = await conn.query(sql, [quantity, order_id, product_id]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (error) {
      throw new Error(
        `Cannot add product ${product_id} to order ${order_id} : ${error}`
      );
    }
  }

  async editQuantityOfProduct(
    order_id: number,
    product_id: number,
    quantity: number
  ): Promise<{ product_id: number; order_id: number; quantity: number }> {
    try {
      const conn = await client.connect();
      const orderSql = "SELECT * FROM orders WHERE id=$1";

      const result = await conn.query(orderSql, [order_id]);
      const order = result.rows[0];

      if (!order) {
        throw new Error(`Cannot not find order ${order_id}`);
      }
      if (order.status !== "active") {
        throw new Error(
          `Cannot edit quantity of product ${product_id} in order ${order_id} because order status is ${order.status}`
        );
      }
      conn.release();
    } catch (error) {
      throw new Error(`${error}`);
    }
    try {
      const sql =
        "UPDATE orders_products SET quantity=$1 WHERE order_id=$2 AND product_id=$3 RETURNING *;";
      const conn = await client.connect();

      const result = await conn.query(sql, [quantity, order_id, product_id]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (error) {
      throw new Error(
        `Cannot edit quantity of product ${product_id} in order ${order_id} : ${error}`
      );
    }
  }

  async destroyProductFromOrder(
    order_id: number,
    product_id: number
  ): Promise<{ product_id: number; order_id: number; quantity: number }> {
    try {
      const conn = await client.connect();
      const orderSql = "SELECT * FROM orders WHERE id=$1";

      const result = await conn.query(orderSql, [order_id]);
      const order = result.rows[0];

      if (!order) {
        throw new Error(`Cannot not find order ${order_id}`);
      }
      if (order.status !== "active") {
        throw new Error(
          `Cannot delete product ${product_id} from order ${order_id} because order status is ${order.status}`
        );
      }
      conn.release();
    } catch (error) {
      throw new Error(`${error}`);
    }
    try {
      const sql =
        "DELETE FROM orders_products WHERE order_id=$1 AND product_id=$2 RETURNING *;";
      const conn = await client.connect();

      const result = await conn.query(sql, [order_id, product_id]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (error) {
      throw new Error(
        `Cannot delete product ${product_id} from order ${order_id} : ${error}`
      );
    }
  }
}
