import { formatDateTime } from "./dateTime";
import Sun from "../assets/sun.png";
import Cloud from "../assets/cloud.png";

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

const getWeatherIcon = (description) => {
  switch (description) {
    case "Clouds":
    case "Rain":
      return (
        <img
          src={Cloud}
          className="weatherIcon w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72"
          alt="Cloud"
        />
      );
    case "Sun":
      return (
        <img
          src={Sun}
           className="weatherIcon w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72"
          alt="Sun"
        />
      );
    default:
      return null;
  }
};

export { toWeatherDTO, getWeatherIcon };

// type WeatherDTO = {
//     locationName: string,
//     dateTime: string,
//     temperature: number,
//     highTemperature: number,
//     lowTemperature: number,
//     humidity: number,
//     description: string
// }
