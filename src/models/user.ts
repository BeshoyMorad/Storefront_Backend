import client from "../database";
import bcrypt from "bcrypt";

const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;

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

      const hash = bcrypt.hashSync(
        u.password + pepper,
        parseInt(saltRounds as string)
      );

      const result = await conn.query(sql, [u.firstname, u.lastname, hash]);

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
      const sql = "DELETE FROM users WHERE id=$1 RETURNING *;";

      const result = await conn.query(sql, [id]);

      const user = result.rows[0];
      conn.release();

      return user;
    } catch (error) {
      throw new Error(`Cannot delete user with id ${id} : ${error}`);
    }
  }

  async authenticate(u: User): Promise<User | null> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM users WHERE firstname=$1 AND lastname=$2";

      const result = await conn.query(sql, [u.firstname, u.lastname]);

      if (result.rows.length) {
        const authUser = result.rows[0];
        if (bcrypt.compareSync(u.password + pepper, authUser.password)) {
          return authUser;
        }
      }

      return null;
    } catch (error) {
      throw new Error(`Cannot authenticate the user : ${error}`);
    }
  }
}
