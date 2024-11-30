export type Coordinates = [number, number]

export interface Target {
    coord_x: number;
    coord_y: number;
    coord_z: number;
    crs_xy: number;
    speed_r?: number;
    speed: number;
}

export interface Interceptor {
    lon: number;
    lat: number;
    max_speed: number;
    cruise_speed: number;
    max_distance: number;
}
