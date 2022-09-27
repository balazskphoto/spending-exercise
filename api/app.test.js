const request = require("supertest");
const server = require("./server");

describe("/spendings", () => {
  test("It should response the GET method", done => {
    request(server)
      .get("/spendings")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
