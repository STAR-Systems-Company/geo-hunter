"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var calculateTargetTrajectory = function (coords, speed, height, interval) {
    if (interval === void 0) { interval = 1; }
    var intervalMeters = ((speed * 1000) / 3600) * interval;
    var result = [];
    var currentPoint = coords[0];
    result.push(currentPoint);
    for (var i = 0; i < coords.length - 1; i++) {
        var startPoint = coords[i];
        var endPoint = coords[i + 1];
        var distance = (0, utils_1.getDistance)(startPoint, endPoint, height);
        var bearingValue = (0, utils_1.bearing)(startPoint, endPoint);
        while (distance > intervalMeters) {
            currentPoint = (0, utils_1.destination)(currentPoint, intervalMeters / 1000, bearingValue);
            result.push(currentPoint);
            distance -= intervalMeters;
        }
    }
    return result;
};
exports.default = calculateTargetTrajectory;
