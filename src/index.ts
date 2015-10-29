import morgan = require("morgan");
import body = require("./tokens/body");
import skip = require("./skip/node-azure");

morgan.token("body", body);
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

export = {
    format: "[:date[iso]] \":method :url HTTP/:http-version\" :status :res[content-length] \":referrer\" \":user-agent\" :body",
    options: options
}
