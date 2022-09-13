import client from "../database";

export type User = {
  id?: number;
  firstname: string;
  lastname: string;
  password: string;
};

export class UserStore {
  async create(u: User): Promise<User> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO users(firstname, lastname, password) VALUES($1, $2, $3) RETURNING *;";

      const result = await conn.query(sql, [
        u.firstname,
        u.lastname,
        u.password,
      ]);

      const user = result.rows[0];
      conn.release();

      return user;
    } catch (error) {
      throw new Error(`Cannot add new user ${u.firstname} : ${error}`);
    }
  }

  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM users;";

      const result = await conn.query(sql);

      const users = result.rows;
      conn.release();

      return users;
    } catch (error) {
      throw new Error(`Cannot index all users : ${error}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM users WHERE id=$1;";

      const result = await conn.query(sql, [id]);

      const user = result.rows[0];
      conn.release();

      return user;
    } catch (error) {
      throw new Error(`Cannot get user with id ${id} : ${error}`);
    }
  }

  async update(u: User): Promise<User> {
    try {
      const conn = await client.connect();
      const sql =
        "UPDATE users SET firstname=$1, lastname=$2 WHERE id=$3 RETURNING *;";

      const result = await conn.query(sql, [u.firstname, u.lastname, u.id]);

      const user = result.rows[0];
      conn.release();

      return user;
    } catch (error) {
      throw new Error(`Cannot update user ${u.firstname} : ${error}`);
    }
  }

  async destroy(id: number): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = "DELETE FROM users WHERE id=$1;";

      const result = await conn.query(sql, [id]);

      const user = result.rows[0];
      conn.release();

      return user;
    } catch (error) {
      throw new Error(`Cannot delete user with id ${id} : ${error}`);
    }
  }
}
