import client from "../database";

export type User = {
  id?: number;
  firstName: string;
  lastName: string;
  password: string;
};

export class UserStore {
  async create(u: User): Promise<User> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO users(firstName, lastName, password) VALUES($1, $2, $3) RETURNING *;";

      const result = await conn.query(sql, [
        u.firstName,
        u.lastName,
        u.password,
      ]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot add new user ${u.firstName} : ${error}`);
    }
  }

  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM users;";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`Cannot index all users : ${error}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM users WHERE id=$1;";

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot get user with id ${id} : ${error}`);
    }
  }

  async update(u: User): Promise<User> {
    try {
      const conn = await client.connect();
      const sql =
        "UPDATE users SET firstName=$1, lastName=$2 WHERE id=$3 RETURNING *;";

      const result = await conn.query(sql, [u.firstName, u.lastName, u.id]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot update user ${u.firstName} : ${error}`);
    }
  }

  async destroy(id: number): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = "DELETE FROM users WHERE id=$1;";

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot delete user with id ${id} : ${error}`);
    }
  }
}
