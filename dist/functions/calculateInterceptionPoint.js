"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var calculateInterceptionPoint = function (targetPoints, interceptorStart, targetSpeed, interceptorSpeed, maxAllowedTimeDifference) {
    if (maxAllowedTimeDifference === void 0) { maxAllowedTimeDifference = 10; }
    var closestPoint = null;
    var minTimeDifference = Infinity;
    var steps = 0;
    var targetSpeedMetersPerSec = (targetSpeed * 1000) / 3600;
    var interceptorSpeedMetersPerSec = (interceptorSpeed * 1000) / 3600;
    for (var i = 0; i < targetPoints.length; i++) {
        var targetPoint = targetPoints[i];
        var distanceTargetTraveled = (0, utils_1.getDistance)(targetPoints[0], targetPoint, 0);
        var timeTarget = distanceTargetTraveled / targetSpeedMetersPerSec;
        var distanceInterceptorToPoint = (0, utils_1.getDistance)(interceptorStart, targetPoint, 0);
        var timeInterceptor = distanceInterceptorToPoint / interceptorSpeedMetersPerSec;
        var timeDifference = Math.abs(timeTarget - timeInterceptor);
        if (timeDifference < minTimeDifference) {
            minTimeDifference = timeDifference;
            closestPoint = targetPoint;
            steps = i;
        }
    }
    if (minTimeDifference > maxAllowedTimeDifference) {
        return { point: null, steps: -1 };
    }
    return { point: closestPoint, steps: steps };
};
exports.default = calculateInterceptionPoint;
