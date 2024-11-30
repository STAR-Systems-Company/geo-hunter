import { Coordinates } from '../types';
declare const calculateInterceptionPoint: (targetPoints: Coordinates[], interceptorStart: Coordinates, targetSpeed: number, interceptorSpeed: number, maxAllowedTimeDifference?: number) => {
    point: Coordinates | null;
    steps: number;
};
export default calculateInterceptionPoint;
