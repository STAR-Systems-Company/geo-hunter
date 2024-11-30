import {Coordinates, Interceptor, Target} from './types';
import {destination, getDistance} from './utils';
import {calculateInterceptionPoint, calculateTargetTrajectory} from './functions';

const makeInterception = (
    target: Target,
    interceptor: Interceptor
): { point: Coordinates | null; steps: number; interceptedPercent?: number } => {
    const targetCoordinate: Coordinates = [target.coord_x, target.coord_y];
    const targetDirection = target.crs_xy;
    const targetSpeed = target.speed_r || target.speed;
    const targetAltitude = target.coord_z;

    const interceptorCoordinate: Coordinates = [interceptor.lon, interceptor.lat];
    const interceptorSpeed = (interceptor.max_speed + interceptor.cruise_speed) / 2;
    const interceptorDistance = interceptor.max_distance;

    const end = destination(targetCoordinate, 20, targetDirection);
    const targetTrajectory = calculateTargetTrajectory(
        [targetCoordinate, end],
        targetSpeed,
        targetAltitude
    );

    const interceptionResult = calculateInterceptionPoint(
        targetTrajectory,
        interceptorCoordinate,
        targetSpeed,
        interceptorSpeed
    );

    const {point: interceptionPoint, steps} = interceptionResult;

    if (!interceptionPoint) {
        return {point: null, steps: -1};
    }

    const distanceToInterceptor = getDistance(interceptorCoordinate, interceptionPoint, 0);

    if (distanceToInterceptor <= interceptorDistance) {
        return {
            point: interceptionPoint,
            steps,
            interceptedPercent: 90,
        };
    }

    return {point: null, steps: -1};
};

export default makeInterception;
