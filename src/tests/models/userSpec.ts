import { User, UserStore } from "../../models/user";

const store = new UserStore();

describe("User Model", () => {
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

  it("create method should add a user", async () => {
    const result = await store.create({
      firstname: "Beshoy",
      lastname: "Morad",
      password: "testingPassword",
    });

    expect(result).toEqual({
      id: 1,
      firstname: "Beshoy",
      lastname: "Morad",
      password: "testingPassword",
    });
  });

  it("index method should return a list of users", async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        id: 1,
        firstname: "Beshoy",
        lastname: "Morad",
        password: "testingPassword",
      },
    ]);
  });

  it("show method should return the correct user", async () => {
    const result = await store.show(1);
    expect(result).toEqual({
      id: 1,
      firstname: "Beshoy",
      lastname: "Morad",
      password: "testingPassword",
    });
  });

  it("delete method should remove the user", async () => {
    await store.destroy(1);
    const result = await store.index();

    expect(result).toEqual([]);
  });
});
