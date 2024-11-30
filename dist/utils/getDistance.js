"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var toRadians_1 = __importDefault(require("./toRadians"));
var _DEFAULT_RADIUS = 6371008.8; // Радиус Земли в метрах
var getDistance = function (c1, c2, targetHeight, radius) {
    if (radius === void 0) { radius = _DEFAULT_RADIUS; }
    var lat1 = (0, toRadians_1.default)(c1[1]);
    var lat2 = (0, toRadians_1.default)(c2[1]);
    var deltaLatBy2 = (lat2 - lat1) / 2;
    var deltaLonBy2 = (0, toRadians_1.default)(c2[0] - c1[0]) / 2;
    var a = Math.pow(Math.sin(deltaLatBy2), 2) +
        Math.pow(Math.sin(deltaLonBy2), 2) * Math.cos(lat1) * Math.cos(lat2);
    var distance = 2 * radius * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var heightB = 0; // Предположим, что высота второй точки равна 0
    var verticalDistance = targetHeight - heightB;
    return Math.sqrt(Math.pow(distance, 2) + Math.pow(verticalDistance, 2));
};
exports.default = getDistance;
