const request = require("supertest");
const http = require("http");
const app = require("../app");

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(done);
});

afterAll((done) => {
  server.close(done);
});

describe("GET /aggregate-data", () => {
  it("should return unified response with api1, api2, api3", async () => {
    const res = await request(server).get("/aggregate-data").expect(200);

    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("cached");
    expect(res.body).toHaveProperty("expiresAt");

    const { data } = res.body;
    expect(data).toHaveProperty("api1");
    expect(data).toHaveProperty("api2");
    expect(data).toHaveProperty("api3");

    Object.values(data).forEach(api => {
      expect(api).toHaveProperty("result");
      expect(api).toHaveProperty("status");
      expect(api).toHaveProperty("timestamp");
    });
  });
});
