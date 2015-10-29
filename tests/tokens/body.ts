import express = require("express");
import body = require("../../src/tokens/body");
import chai = require("chai");
const expect = chai.expect;

describe("index", () => {
    describe("body", () => {
        context("given a GET request", () => {
            it("should return an empty string", () => {
                let req = <express.Request> {
                    method: "GET"
                };
                let result = body(req);
                expect(result).to.be.a("string");
                expect(result.length).to.equal(0);
            });
        });
        context("given a POST request", () => {
            it("should return '{message:hello}'", () => {
                const expected = {
                    message: "hello"
                };
                let req = <express.Request> {
                    method: "POST",
                    body: expected
                };
                const result = body(req);
                expect(result).to.be.a("string");
                expect(result).to.equal(JSON.stringify(expected));
            });
            it("should hide a password field", () =>  {
                const actual = {
                    message: "hello",
                    password: "world"
                };
                const expected = {
                    message: "hello",
                    password: "****"
                };
                let req = <express.Request> {
                    method: "POST",
                    body: actual
                };
                const result = body(req);
                expect(result).to.be.a("string");
                expect(result).to.equal(JSON.stringify(expected));
            });
            it("should hide a client_secret field", () =>  {
                const actual = {
                    message: "hello",
                    client_secret: "world"
                };
                const expected = {
                    message: "hello",
                    client_secret: "****"
                };
                let req = <express.Request> {
                    method: "POST",
                    body: actual
                };
                const result = body(req);
                expect(result).to.be.a("string");
                expect(result).to.equal(JSON.stringify(expected));
            });
        });
        context("given a PUT request", () => {
            it("should return '{message:hello}'", () => {
                const expected = {
                    message: "hello"
                };
                let req = <express.Request> {
                    method: "PUT",
                    body: expected
                };
                const result = body(req);
                expect(result).to.be.a("string");
                expect(result).to.equal(JSON.stringify(expected));
            });
        });
    });
});
