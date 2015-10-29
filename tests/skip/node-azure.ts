import skip = require("../../src/skip/node-azure");
import chai = require("chai");
import express = require("express");
const expect = chai.expect;

describe("node-azure", () => {
    context("given the user-agent header === AlwaysOn", () => {
        it("should return true", () => {
            const req = <express.Request> {
            };
            expect(skip(req)).to.be.true;
        });
    });
});
