"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnect = void 0;
var mongoose_1 = require("mongoose");
// ConnectOptions su vrv depraceted i ne moraju da se stavljaju.
var dbConnect = function () {
    (0, mongoose_1.connect)(process.env.MONGO_URI).then(function () { return console.log("Connected successfully"); }, function (error) { return console.log(error); });
};
exports.dbConnect = dbConnect;
/*
, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } as ConnectOptions)*/ 
