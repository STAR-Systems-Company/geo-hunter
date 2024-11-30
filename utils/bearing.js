const toRadians = require("./toRadians");

const toDegrees = (angleInRadians) => (angleInRadians * 180) / Math.PI;

const bearing = (start, end) => {
    const [lon1, lat1] = start.map(toRadians);
    const [lon2, lat2] = end.map(toRadians);

    const y = Math.sin(lon2 - lon1) * Math.cos(lat2);
    const x =
        Math.cos(lat1) * Math.sin(lat2) -
        Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);

    return (toDegrees(Math.atan2(y, x)) + 360) % 360;
};

module.exports = bearing;
