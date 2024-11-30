import toRadians from './toRadians';

const _DEFAULT_RADIUS = 6371008.8; // Радиус Земли в метрах

const getDistance = (
    c1: [number, number],
    c2: [number, number],
    targetHeight: number,
    radius = _DEFAULT_RADIUS
): number => {
    const lat1 = toRadians(c1[1]);
    const lat2 = toRadians(c2[1]);
    const deltaLatBy2 = (lat2 - lat1) / 2;
    const deltaLonBy2 = toRadians(c2[0] - c1[0]) / 2;

    const a =
        Math.sin(deltaLatBy2) ** 2 +
        Math.sin(deltaLonBy2) ** 2 * Math.cos(lat1) * Math.cos(lat2);

    const distance = 2 * radius * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const heightB = 0; // Предположим, что высота второй точки равна 0
    const verticalDistance = targetHeight - heightB;

    return Math.sqrt(distance ** 2 + verticalDistance ** 2);
};

export default getDistance;
