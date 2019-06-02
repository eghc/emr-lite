const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:5000/";

describe("routes : static", () => {

//check that the test api works
  describe("GET /api/hello", () => {
    it("should return status code 200", (done) => {
      request.get(base + 'api/hello', (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toContain("testing");
        done();
      });
    });

  });
});
