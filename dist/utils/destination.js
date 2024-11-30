"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var toRadians_1 = __importDefault(require("./toRadians"));
var destination = function (start, distance, bearing, radius) {
    if (radius === void 0) { radius = 6371; }
    var _a = start.map(toRadians_1.default), lon1 = _a[0], lat1 = _a[1];
    var angularDistance = distance / radius;
    var bearingRad = (0, toRadians_1.default)(bearing);
    var lat2 = Math.asin(Math.sin(lat1) * Math.cos(angularDistance) +
        Math.cos(lat1) * Math.sin(angularDistance) * Math.cos(bearingRad));
    var lon2 = lon1 +
        Math.atan2(Math.sin(bearingRad) * Math.sin(angularDistance) * Math.cos(lat1), Math.cos(angularDistance) - Math.sin(lat1) * Math.sin(lat2));
    return [
        ((lon2 * 180) / Math.PI + 540) % 360 - 180, // Долгота
        (lat2 * 180) / Math.PI, // Широта
    ];
};
exports.default = destination;
