import express = require("express");
const skip = (req: express.Request) => {
    return true;
};

export = skip;
