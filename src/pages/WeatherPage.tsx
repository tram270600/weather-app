import React, { useState } from "react";
import LocationInfoBar from "./components/LocationInfoBar/LocationInfoBar";
import "../styles/WeatherPage.scss";
import SearchBar from "./components/SearchBar/SearchBar";
import axios from "axios";
import { toWeatherDTO, getWeatherIcon } from "../utils/weatherData";
import { HandleItemFunction, SearchHistory } from "../utils/typeUtils";

function WeatherPage() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [searchHistoryList, setSearchHistoryList] = useState<SearchHistory[]>([]);
  const [, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [weatherInfo, setWeatherInfo] = useState({
    locationName: "Johor, MY",
    dateTime: "01-09-2022 09:41 AM",
    temperature: 26,
    highTemperature: 29,
    lowTemperature: 26,
    humidity: 58,
    description: "Clouds",
  });

  const handleSearch: HandleItemFunction = (city: string, country: string) => {
    setLoading(true);
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`
      )
      .then((data) => {
        const weatherDTO = toWeatherDTO(data.data);
        const { locationName, dateTime } = weatherDTO;
        setWeatherInfo(weatherDTO);
        setSearchHistoryList([
          { locationName, dateTime },
          ...searchHistoryList
        ]);
        setLoading(false);
        setError("");
      })
      .catch(() => {
        setError("Weather Information cannot be found");
        setLoading(false);
      });
  };

  const handleItemRecall: HandleItemFunction = (name, dateTime) => {
    const [city, country] = name.split(",");
    handleSearch(city, country); // Update state with clicked item
  };

  const handleItemRemove: HandleItemFunction = (name, dateTime) => {
    const updatedHistoryList = searchHistoryList.filter(
      (item) => !(item.locationName === name && item.dateTime === dateTime)
    );
    setSearchHistoryList(updatedHistoryList);
  };

  if (!weatherInfo) {
    return (<div> No weather info found</div>)
  }

  console.log("origin", searchHistoryList, "\n reverse: ", [...searchHistoryList].reverse())

  return (
    <div
      className={`bg-cover ${searchHistoryList.length <= 1 ? "h-screen" : ""
        } bg-weather-pattern-light`}
    >
      <div className="max-w-2xl pt-6 flex flex-col items-start justify-center gap-28 mx-4 md:m-auto md:pt-0">
        {/* Search bar */}
        <SearchBar handleSearch={handleSearch} errorMessage={error} />

        {/* Today Weather section */}
        <div className="w-full rounded-[40px] border-2 mb-12 weatherInfo--light">
          {getWeatherIcon(weatherInfo.description)}

          <div className="m-5 md:m-12">
            {/* Today Weather Information */}
            <span className="title">Today's Weather</span>
            <div className="flex items-end">
              <div className="w-full">
                {/* Apply loading for a long waiting response */}
                {/* {loading ? <LoadingDot /> : <p className="degree">{weatherInfo.temperature}&deg;</p>} */}
                <p className="degree">{weatherInfo.temperature}&deg;</p>
                <p className="content">
                  H: {weatherInfo.highTemperature}&deg; L:{" "}
                  {weatherInfo.lowTemperature}&deg;
                </p>
                <div className="flex gap-4 content--light justify-between">
                  <p className="content--bold">{weatherInfo.locationName}</p>
                  <p className="hidden md:block">{weatherInfo.dateTime}</p>
                  <p className="hidden md:block">Humidity: {weatherInfo.humidity}%</p>
                  <p className="hidden md:block">{weatherInfo.description}</p>
                </div>
              </div>
              <div className="w-full text-right text-grey-500 md:hidden">
                <p>{weatherInfo.description}</p>
                <p>Humidity: {weatherInfo.humidity}%</p>
                <p>{weatherInfo.dateTime}</p>
              </div>
            </div>

            {/* Search History List */}
            <div className="rounded-[24px] bg-white/20 mt-6">
              <div className="p-5">
                <p className="title">Search History</p>
                <div className="flex flex-col mt-5 gap-4">
                  {searchHistoryList.length > 0 ? (
                    searchHistoryList.map(
                      (history) => {
                        return (
                          <LocationInfoBar
                            key={history.locationName + history.dateTime}
                            name={history.locationName}
                            dateTime={history.dateTime}
                            onItemRecall={handleItemRecall}
                            onItemRemove={handleItemRemove}
                          ></LocationInfoBar>
                        );
                      }
                    )
                  ) : (
                    <h3 className="text-center"> No Record </h3>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default WeatherPage;
