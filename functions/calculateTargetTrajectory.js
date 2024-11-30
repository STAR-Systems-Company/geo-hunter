const getDistance = require("../utils/getDistance");
const bearing = require("../utils/bearing");
const destination = require("../utils/destination");

const calculateTargetTrajectory = (coords, speed, height, interval = 1) => {
    const intervalMeters = ((speed * 1000) / 3600) * interval;
    const result = [];
    let currentPoint = coords[0];
    result.push(currentPoint);

    for (let i = 0; i < coords.length - 1; i++) {
        const startPoint = coords[i];
        const endPoint = coords[i + 1];
        let distance = getDistance(startPoint, endPoint, height);
        let bearingValue = bearing(startPoint, endPoint);

        while (distance > intervalMeters) {
            currentPoint = destination(currentPoint, intervalMeters / 1000, bearingValue);
            result.push(currentPoint);
            distance -= intervalMeters;
        }
    }

    return result;
};

module.exports = calculateTargetTrajectory;
