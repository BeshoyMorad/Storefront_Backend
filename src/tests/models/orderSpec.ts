import { OrderStore } from "../../models/order";
import { UserStore } from "../../models/user";

const store = new OrderStore();
const userStore = new UserStore();

describe("Order Model", () => {
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

  it("create method should add a order", async () => {
    await userStore.create({
      firstname: "Beshoy",
      lastname: "Morad",
      password: "testingPassword",
    });

    const result = await store.create({
      user_id: "1",
      status: "active",
    });

    expect(result).toEqual({
      id: 1,
      user_id: "1",
      status: "active",
    });
  });

  it("index method should return a list of orders", async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        id: 1,
        user_id: "1",
        status: "active",
      },
    ]);
  });

  it("show method should return the correct order", async () => {
    const result = await store.show(1);
    expect(result).toEqual({
      id: 1,
      user_id: "1",
      status: "active",
    });
  });

  it("delete method should remove the order", async () => {
    await store.destroy(1);
    await userStore.destroy(1);
    const result = await store.index();

    expect(result).toEqual([]);
  });
});
