import index = require("../src/index");
import _ = require("lodash");
import chai = require("chai");
import sinon = require("sinon");
import sinonChai = require("sinon-chai");
chai.use(sinonChai);
const expect = chai.expect;

describe("index", () => {
    describe("#initialize", () => {
        it("should return an object", () => {
            let morgan = index.initialize();
            expect(morgan).to.exist;
        });
    });
    describe("format", () => {
        it("should be a string", () => {
            expect(index.format).to.be.a("string");
        });
    });
    describe("options", () => {
        it("should contain a property called skip that is a function", () => {
            expect(_.isFunction(index.options.skip)).to.be.true;
        });
        context("#stream", () => {
            before(function() {
                sinon.spy(console, "log");
            });

            var stream = index.options.stream();
            it("should call console.log", () => {
                stream.write("hello world");
                expect(console.log).to.be.calledOnce;
            });
        });
    });
});
