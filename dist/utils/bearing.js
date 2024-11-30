"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var toRadians_1 = __importDefault(require("./toRadians"));
var toDegrees = function (angleInRadians) { return (angleInRadians * 180) / Math.PI; };
var bearing = function (start, end) {
    var _a = start.map(toRadians_1.default), lon1 = _a[0], lat1 = _a[1];
    var _b = end.map(toRadians_1.default), lon2 = _b[0], lat2 = _b[1];
    var y = Math.sin(lon2 - lon1) * Math.cos(lat2);
    var x = Math.cos(lat1) * Math.sin(lat2) -
        Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
    return (toDegrees(Math.atan2(y, x)) + 360) % 360;
};
exports.default = bearing;
