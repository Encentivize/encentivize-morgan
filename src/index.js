var morgan = require("morgan");
var body = require("./tokens/body");
var skip = require("./skip/node-azure");
morgan.token("body", body);
var options = {
    skip: skip,
    stream: function () {
        return {
            write: function (message) {
                console.log("trace", message);
            }
        };
    }
};
module.exports = {
    format: "[:date[iso]] \":method :url HTTP/:http-version\" :status :res[content-length] \":referrer\" \":user-agent\" :body",
    options: options
};
