import client from "../database";

export type Orders_Products = {
  order_id: string;
  product_id: string;
  quantity: number;
};
export class Orders_ProductsStore {
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

  async addProductToOrder(op: Orders_Products): Promise<Orders_Products> {
    try {
      const conn = await client.connect();
      const orderSql = "SELECT * FROM orders WHERE id=$1";

      const result = await conn.query(orderSql, [op.order_id]);
      const order = result.rows[0];

      if (!order) {
        throw new Error(`Cannot not find order ${op.order_id}`);
      }
      if (order.status !== "active") {
        throw new Error(
          `Cannot not add product ${op.product_id} to order ${op.order_id} because order status is ${order.status}`
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

      const result = await conn.query(sql, [
        op.quantity,
        op.order_id,
        op.product_id,
      ]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (error) {
      throw new Error(
        `Cannot add product ${op.product_id} to order ${op.order_id} : ${error}`
      );
    }
  }

  async editQuantityOfProduct(op: Orders_Products): Promise<Orders_Products> {
    try {
      const conn = await client.connect();
      const orderSql = "SELECT * FROM orders WHERE id=$1";

      const result = await conn.query(orderSql, [op.order_id]);
      const order = result.rows[0];

      if (!order) {
        throw new Error(`Cannot not find order ${op.order_id}`);
      }
      if (order.status !== "active") {
        throw new Error(
          `Cannot edit quantity of product ${op.product_id} in order ${op.order_id} because order status is ${order.status}`
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

      const result = await conn.query(sql, [
        op.quantity,
        op.order_id,
        op.product_id,
      ]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (error) {
      throw new Error(
        `Cannot edit quantity of product ${op.product_id} in order ${op.order_id} : ${error}`
      );
    }
  }

  async destroyProductFromOrder(
    order_id: number,
    product_id: number
  ): Promise<Orders_Products> {
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
