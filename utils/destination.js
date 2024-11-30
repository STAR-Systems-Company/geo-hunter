const toRadians = require("./toRadians");

const destination = (start, distance, bearing, radius = 6371) => {
    const [lon1, lat1] = start.map(toRadians);
    const angularDistance = distance / radius;
    const bearingRad = toRadians(bearing);

    const lat2 = Math.asin(
        Math.sin(lat1) * Math.cos(angularDistance) +
        Math.cos(lat1) * Math.sin(angularDistance) * Math.cos(bearingRad)
    );

    const lon2 =
        lon1 +
        Math.atan2(
            Math.sin(bearingRad) * Math.sin(angularDistance) * Math.cos(lat1),
            Math.cos(angularDistance) - Math.sin(lat1) * Math.sin(lat2)
        );

    return [((lon2 * 180) / Math.PI + 540) % 360 - 180, (lat2 * 180) / Math.PI];
};

module.exports = destination;