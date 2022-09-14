import supertest from "supertest";
import app from "../../server";

const request = supertest(app);

fdescribe("Testing user endpoint", () => {
  let token: string;
  it("Create a new user using '/api/users' POST", async () => {
    const response = await request.post("/api/users").send({
      firstname: "Beshoy",
      lastname: "Morad",
      password: "123456",
    });
    //save the token for next requests
    token = (response.headers.authorization as string).split(" ")[1];

    expect(response.statusCode).toEqual(200);
  });

  it("Index all the users using '/api/users' GET", async () => {
    const response = await request
      .get("/api/users")
      .set("authorization", "Bearer " + token);

    expect(response.statusCode).toEqual(200);
  });

  it("Try to show users without JWT", async () => {
    const response = await request.get("/api/users");

    expect(response.statusCode).toEqual(401);
  });

  it("Show user with id = 1 '/api/users/1'", async () => {
    const response = await request
      .get("/api/users/1")
      .set("authorization", "Bearer " + token);

    expect(response.statusCode).toEqual(200);
  });

  it("Try to get user don't exist", async () => {
    const response = await request
      .get("/api/users/3")
      .set("authorization", "Bearer " + token);

    expect(response.statusCode).toEqual(404);
  });

  it("Try to update a user doesn't exist", async () => {
    const response = await request
      .put("/api/users/5")
      .set("authorization", "Bearer " + token)
      .send({
        firstname: "Besho",
        lastname: "Morad",
        password: "123456",
      });

    expect(response.statusCode).toEqual(404);
  });

  it("Update the user with id = 1", async () => {
    const response = await request
      .put("/api/users/1")
      .set("authorization", "Bearer " + token)
      .send({
        firstname: "Besho",
        lastname: "Morad",
        password: "123456",
      });

    expect(response.statusCode).toEqual(200);
  });

  it("Try to login with different password", async () => {
    const response = await request.post("/api/users/authenticate").send({
      firstname: "Besho",
      lastname: "Morad",
      password: "12345",
    });

    expect(response.statusCode).toEqual(401);
  });

  it("Login with the right password", async () => {
    const response = await request.post("/api/users/authenticate").send({
      firstname: "Besho",
      lastname: "Morad",
      password: "123456",
    });

    expect(response.statusCode).toEqual(200);
  });

  it("Try to delete a user doesn't exist", async () => {
    const response = await request
      .delete("/api/users/5")
      .set("authorization", "Bearer " + token);

    expect(response.statusCode).toEqual(404);
  });

  it("Delete a user with id = 1", async () => {
    const response = await request
      .delete("/api/users/1")
      .set("authorization", "Bearer " + token);

    expect(response.statusCode).toEqual(200);
  });
});
