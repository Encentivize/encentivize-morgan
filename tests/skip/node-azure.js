var skip = require("../../src/skip/node-azure");
var chai = require("chai");
var expect = chai.expect;
describe("node-azure", function () {
    context("given the user-agent header === AlwaysOn", function () {
        it("should return true", function () {
            var req = {};
            expect(skip(req)).to.be.true;
        });
    });
});
