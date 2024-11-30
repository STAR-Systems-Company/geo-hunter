import {Coordinates} from '../types';
import {bearing, destination, getDistance} from '../utils';

const calculateTargetTrajectory = (
    coords: Coordinates[],
    speed: number,
    height: number,
    interval = 1
): Coordinates[] => {
    const intervalMeters = ((speed * 1000) / 3600) * interval;
    const result: Coordinates[] = [];
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

export default calculateTargetTrajectory;
