var redactPattern = "****";
var redactClientSecret = function (body) {
    if (body.client_secret) {
        body.client_secret = redactPattern;
    }
};
var redactPassword = function (body) {
    if (body.password) {
        body.password = redactPattern;
    }
};
var body = function (req) {
    if (req.method === "POST" || req.method === "PUT") {
        var body_1 = JSON.parse(JSON.stringify(req.body));
        redactPassword(body_1);
        redactClientSecret(body_1);
        return JSON.stringify(body_1);
    }
    return "";
};
module.exports = body;
