import {Coordinates} from '../types';
import {getDistance} from '../utils';

const calculateInterceptionPoint = (
    targetPoints: Coordinates[],
    interceptorStart: Coordinates,
    targetSpeed: number,
    interceptorSpeed: number,
    maxAllowedTimeDifference = 10
): { point: Coordinates | null; steps: number } => {
    let closestPoint: Coordinates | null = null;
    let minTimeDifference = Infinity;
    let steps = 0;

    const targetSpeedMetersPerSec = (targetSpeed * 1000) / 3600;
    const interceptorSpeedMetersPerSec = (interceptorSpeed * 1000) / 3600;

    for (let i = 0; i < targetPoints.length; i++) {
        const targetPoint = targetPoints[i];

        const distanceTargetTraveled = getDistance(targetPoints[0], targetPoint, 0);
        const timeTarget = distanceTargetTraveled / targetSpeedMetersPerSec;

        const distanceInterceptorToPoint = getDistance(interceptorStart, targetPoint, 0);
        const timeInterceptor = distanceInterceptorToPoint / interceptorSpeedMetersPerSec;

        const timeDifference = Math.abs(timeTarget - timeInterceptor);

        if (timeDifference < minTimeDifference) {
            minTimeDifference = timeDifference;
            closestPoint = targetPoint;
            steps = i;
        }
    }

    if (minTimeDifference > maxAllowedTimeDifference) {
        return {point: null, steps: -1};
    }

    return {point: closestPoint, steps};
};

export default calculateInterceptionPoint;
