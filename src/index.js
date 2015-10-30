var morgan = require("morgan");
var body = require("./tokens/body");
var skip = require("./skip/node-azure");
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
var format = "[:date[iso]] \":method :url HTTP/:http-version\" :status :res[content-length] \":referrer\" \":user-agent\" :body";
var initialize = function () {
    morgan.token("body", body);
    return morgan(format, options);
};
module.exports = {
    format: format,
    options: options,
    initialize: initialize
};
