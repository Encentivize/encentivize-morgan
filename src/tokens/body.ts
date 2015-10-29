import express = require("express");

const redactPattern = "****";

const redactClientSecret = (body) => {
    if (body.client_secret) {
        body.client_secret = redactPattern;
    }
};

const redactPassword = (body) => {
    if (body.password) {
        body.password = redactPattern;
    }
};

const body = (req: express.Request): string => {
    if (req.method === "POST" || req.method === "PUT") {
        let body = JSON.parse(JSON.stringify(req.body));
        redactPassword(body);
        redactClientSecret(body);
        return JSON.stringify(body);
    }
    return "";
};

export = body;
