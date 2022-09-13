import { UserStore } from "../../models/user";

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

    expect(result).toEqual(
      jasmine.objectContaining({
        firstname: "Beshoy",
        lastname: "Morad",
      })
    );
  });

  it("index method should return a list of users", async () => {
    const result = await store.index();
    expect(result).toContain(
      jasmine.objectContaining({
        firstname: "Beshoy",
        lastname: "Morad",
      })
    );
  });

  it("show method should return the correct user", async () => {
    const result = await store.show(2);
    expect(result).toEqual(
      jasmine.objectContaining({
        firstname: "Beshoy",
        lastname: "Morad",
      })
    );
  });

  it("delete method should remove the user", async () => {
    await store.destroy(2);
    const result = await store.index();

    expect(result).toEqual([]);
  });
});
