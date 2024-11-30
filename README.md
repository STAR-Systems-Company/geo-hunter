# Geo Hunter

**Geo Hunter** is a Node.js library for calculating the interception point of an aerial target based on its coordinates in the EPSG:4326 format (latitude and longitude). It is designed for geographic and aerodynamic calculations, taking into account parameters such as speed, direction, altitude, and maximum range.

---

## Features

- **Interception Point Calculation**: Determines the optimal interception point based on the trajectory of the target and the characteristics of the interceptor.
- **EPSG:4326 Support**: Works with geographic coordinates in latitude and longitude format.
- **Altitude Awareness**: Considers the vertical distance between the target and the interceptor.
- **Trajectory Analysis**: Generates the trajectory of the target based on its direction and speed.
- **Configurable Parameters**: Allows customization of interceptor properties, such as speed, operational range, and starting position.
- **Precision Calculations**: Uses advanced geographic formulas to ensure accurate results.

---

## Installation

To install Geo Hunter, use npm:

```bash
npm install geo-hunter
```

## Usage

### Example: Calculating the Interception Point (JavaScript)
```javascript
const { makeInterception } = require("geo-hunter");

const target = {
  coord_x: 30.52,   // Longitude of the target
  coord_y: 50.45,   // Latitude of the target
  coord_z: 10000,   // Altitude of the target in meters
  crs_xy: 90,       // Direction of movement (in degrees)
  speed: 900        // Speed of the target (km/h)
};

const interceptor = {
  lon: 31.0,        // Longitude of the interceptor
  lat: 50.0,        // Latitude of the interceptor
  max_speed: 1200,  // Maximum speed (km/h)
  cruise_speed: 900,// Cruise speed (km/h)
  max_distance: 500 // Operational range (km)
};

const result = makeInterception(target, interceptor);

if (result.point) {
  console.log(`Interception Point: longitude ${result.point.lon}, latitude ${result.point.lat}`);
  console.log(`Steps to intercept: ${result.steps}`);
  console.log(`Interception Probability: ${result.interceptedPercent}%`);
} else {
  console.log("The target cannot be intercepted under the current conditions.");
}
```

### Example: Calculating the Interception Point (TypeScript)
```typescript
import { makeInterception, Target, Interceptor } from "geo-hunter";

const target: Target = {
  coord_x: 30.52,   // Longitude of the target
  coord_y: 50.45,   // Latitude of the target
  coord_z: 10000,   // Altitude of the target in meters
  crs_xy: 90,       // Direction of movement (in degrees)
  speed: 900        // Speed of the target (km/h)
};

const interceptor: Interceptor = {
  lon: 31.0,        // Longitude of the interceptor
  lat: 50.0,        // Latitude of the interceptor
  max_speed: 1200,  // Maximum speed (km/h)
  cruise_speed: 900,// Cruise speed (km/h)
  max_distance: 500 // Operational range (km)
};

const result = makeInterception(target, interceptor);

if (result.point) {
  console.log(`Interception Point: longitude ${result.point.lon}, latitude ${result.point.lat}`);
  console.log(`Steps to intercept: ${result.steps}`);
  console.log(`Interception Probability: ${result.interceptedPercent}%`);
} else {
  console.log("The target cannot be intercepted under the current conditions.");
}
```

### Parameters Table

| **Parameter**       | **Type**     | **Description**                                           | **Required** |
|---------------------|-------------|-----------------------------------------------------------|--------------|
| `coord_x`           | `number`    | Longitude of the target (in degrees, EPSG:4326).          | Yes          |
| `coord_y`           | `number`    | Latitude of the target (in degrees, EPSG:4326).           | Yes          |
| `coord_z`           | `number`    | Altitude of the target (in meters).                       | Yes          |
| `crs_xy`            | `number`    | Direction of the target's movement (in degrees, 0-360).   | Yes          |
| `speed`             | `number`    | Speed of the target (in km/h).                            | Yes          |
| `lon`               | `number`    | Longitude of the interceptor (in degrees, EPSG:4326).     | Yes          |
| `lat`               | `number`    | Latitude of the interceptor (in degrees, EPSG:4326).      | Yes          |
| `max_speed`         | `number`    | Maximum speed of the interceptor (in km/h).               | Yes          |
| `cruise_speed`      | `number`    | Cruise speed of the interceptor (in km/h).                | Yes          |
| `max_distance`      | `number`    | Operational range of the interceptor (in km).             | Yes          |
| `point`             | `object` or `null` | Coordinates of the interception point (`{ lon: number, lat: number }`) or `null` if not interceptable. | No |
| `steps`             | `number`    | Number of steps required to reach the interception point. | No           |
| `interceptedPercent`| `number` or `undefined` | Probability of successful interception (percentage).     | No           |


### Data Types Table

| **Type**       | **Properties**                                                        | **Description**                                   |
|-----------------|----------------------------------------------------------------------|-------------------------------------------------|
| `Target`        | `coord_x: number`<br>`coord_y: number`<br>`coord_z: number`<br>`crs_xy: number`<br>`speed: number` | Represents the target's coordinates, speed, and movement direction. |
| `Interceptor`   | `lon: number`<br>`lat: number`<br>`max_speed: number`<br>`cruise_speed: number`<br>`max_distance: number` | Represents the interceptor's position, speed, and range.            |
| `InterceptionResult` | `point: { lon: number, lat: number } | null`<br>`steps: number`<br>`interceptedPercent?: number` | Represents the interception point, steps to intercept, and interception probability. |

