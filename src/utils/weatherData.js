import { formatDateTime } from "./dateTime";

const ZERO_POINT_OFFSET = 273.15;

const kelvinToCelsius = (kelvin) => {
  return kelvin - ZERO_POINT_OFFSET;
};

const toWeatherDTO = (data) => {
  return {
    locationName: `${data.name ?? ""}, ${data.sys.country ?? ""} `,
    dateTime: formatDateTime(new Date()),
    temperature: Math.floor(
      parseFloat(kelvinToCelsius(data?.main?.temp ?? 0).toFixed(2))
    ),
    highTemperature: parseFloat(
      kelvinToCelsius(data?.main?.temp_max ?? 0).toFixed(2)
    ),
    lowTemperature: parseFloat(
      kelvinToCelsius(data?.main?.temp_min ?? 0).toFixed(2)
    ),
    humidity: data?.main?.humidity ?? 0,
    description: data?.weather?.[0]?.main,
  };
};

export { toWeatherDTO };

// type WeatherDTO = {
//     locationName: string,
//     dateTime: string,
//     temperature: number,
//     highTemperature: number,
//     lowTemperature: number,
//     humidity: number,
//     description: string
// }
