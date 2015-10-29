var body = require("../../src/tokens/body");
var chai = require("chai");
var expect = chai.expect;
describe("index", function () {
    describe("body", function () {
        context("given a GET request", function () {
            it("should return an empty string", function () {
                var req = {
                    method: "GET"
                };
                var result = body(req);
                expect(result).to.be.a("string");
                expect(result.length).to.equal(0);
            });
        });
        context("given a POST request", function () {
            it("should return '{message:hello}'", function () {
                var expected = {
                    message: "hello"
                };
                var req = {
                    method: "POST",
                    body: expected
                };
                var result = body(req);
                expect(result).to.be.a("string");
                expect(result).to.equal(JSON.stringify(expected));
            });
            it("should hide a password field", function () {
                var actual = {
                    message: "hello",
                    password: "world"
                };
                var expected = {
                    message: "hello",
                    password: "****"
                };
                var req = {
                    method: "POST",
                    body: actual
                };
                var result = body(req);
                expect(result).to.be.a("string");
                expect(result).to.equal(JSON.stringify(expected));
            });
            it("should hide a client_secret field", function () {
                var actual = {
                    message: "hello",
                    client_secret: "world"
                };
                var expected = {
                    message: "hello",
                    client_secret: "****"
                };
                var req = {
                    method: "POST",
                    body: actual
                };
                var result = body(req);
                expect(result).to.be.a("string");
                expect(result).to.equal(JSON.stringify(expected));
            });
        });
        context("given a PUT request", function () {
            it("should return '{message:hello}'", function () {
                var expected = {
                    message: "hello"
                };
                var req = {
                    method: "PUT",
                    body: expected
                };
                var result = body(req);
                expect(result).to.be.a("string");
                expect(result).to.equal(JSON.stringify(expected));
            });
        });
    });
});
