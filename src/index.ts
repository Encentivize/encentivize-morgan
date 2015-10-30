import morgan = require("morgan");
import body = require("./tokens/body");
import skip = require("./skip/node-azure");

const options = {
    skip: skip,
    stream: () => {
        return {
            write: (message) => {
                console.log("trace", message);
            }
        };
    }
};

const format = "[:date[iso]] \":method :url HTTP/:http-version\" :status :res[content-length] \":referrer\" \":user-agent\" :body";

let initialize = () => {
    morgan.token("body", body);
    return morgan(format, options);
};

export = {
    format: format,
    options: options,
    initialize: initialize
}
