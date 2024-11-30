import { Coordinates, Interceptor, Target } from './types';
declare const makeInterception: (target: Target, interceptor: Interceptor) => {
    point: Coordinates | null;
    steps: number;
    interceptedPercent?: number;
};
export default makeInterception;
