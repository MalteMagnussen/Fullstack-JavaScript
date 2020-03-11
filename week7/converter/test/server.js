// test/server.js

const expect = require("chai").expect;
const request = require("request");

const hostURL = "http://localhost:3000/";

describe("Color Code Converter API", () => {
  describe("RGB to Hex conversion", () => {
    const url = `${hostURL}rbgToHex?red=255&green=255&blue=255`;
    it("returns status 200", () => {
      request(url, (err, res, body) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
    it("returns the color in hex", () => {
      request(url, (err, res, body) => {
        expect(body).to.equal("ffffff");
        done();
      });
    });
  });

  describe("Hex to RGB conversion", () => {
    const url = `${hostURL}hexToRgb?hex=00ff00`;

    it("returns status 200", () => {
      request(url, (err, res, body) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
    it("returns the color in RGB", () => {
      request(url, (err, res, body) => {
        expect(body).to.equal("[0,255,0]");
        done();
      });
    });
  });
});
