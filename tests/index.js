var index = require("../src/index");
var _ = require("lodash");
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
chai.use(sinonChai);
var expect = chai.expect;
describe("index", function () {
    describe("format", function () {
        it("should be a string", function () {
            expect(index.format).to.be.a("string");
        });
    });
    describe("options", function () {
        it("should contain a property called skip that is a function", function () {
            expect(_.isFunction(index.options.skip)).to.be.true;
        });
        context("#stream", function () {
            before(function () {
                sinon.spy(console, "log");
            });
            var stream = index.options.stream();
            it("should call console.log", function () {
                stream.write("hello world");
                expect(console.log).to.be.calledOnce;
            });
        });
    });
});
