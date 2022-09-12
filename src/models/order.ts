import client from "../database";

export type Order = {
  id?: number;
  user_id: number;
  status: string;
};

export class OrderStore {}
