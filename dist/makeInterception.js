"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var functions_1 = require("./functions");
var makeInterception = function (target, interceptor) {
    var targetCoordinate = [target.coord_x, target.coord_y];
    var targetDirection = target.crs_xy;
    var targetSpeed = target.speed_r || target.speed;
    var targetAltitude = target.coord_z;
    var interceptorCoordinate = [interceptor.lon, interceptor.lat];
    var interceptorSpeed = (interceptor.max_speed + interceptor.cruise_speed) / 2;
    var interceptorDistance = interceptor.max_distance;
    var end = (0, utils_1.destination)(targetCoordinate, 20, targetDirection);
    var targetTrajectory = (0, functions_1.calculateTargetTrajectory)([targetCoordinate, end], targetSpeed, targetAltitude);
    var interceptionResult = (0, functions_1.calculateInterceptionPoint)(targetTrajectory, interceptorCoordinate, targetSpeed, interceptorSpeed);
    var interceptionPoint = interceptionResult.point, steps = interceptionResult.steps;
    if (!interceptionPoint) {
        return { point: null, steps: -1 };
    }
    var distanceToInterceptor = (0, utils_1.getDistance)(interceptorCoordinate, interceptionPoint, 0);
    if (distanceToInterceptor <= interceptorDistance) {
        return {
            point: interceptionPoint,
            steps: steps,
            interceptedPercent: 90,
        };
    }
    return { point: null, steps: -1 };
};
exports.default = makeInterception;
