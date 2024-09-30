import React, { useState } from "react";
import Sun from "../assets/sun.png";
import Cloud from "../assets/cloud.png";
import LocationInfoBar from "./components/LocationInfoBar/LocationInfoBar";
import "../styles/WeatherPage.scss";
import SearchBar from "./components/SearchBar/SearchBar";
import axios from "axios";
import { toWeatherDTO } from "../utils/weatherData";
import { sortDateTimeLastestFirst } from "../utils/sort";

function WeatherPage() {
  const API_KEY = "3f2b8a0d44d2c2797bc82b61acb21ec8";
  const [searchHistoryList, setSearchHistoryList] = useState([]);
  const [weatherInfo, setWeatherInfo] = useState({
    locationName: "Johor, MY",
    dateTime: "01-09-2022 09:41 AM",
    temperature: 26,
    highTemperature: 29,
    lowTemperature: 26,
    humidity: 58,
    description: "Clouds",
  });
  const [error, setError] = useState("");

  const handleSearch = (city, country) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`
      )
      .then((data) => {
        const weatherDTO = toWeatherDTO(data.data);
        const { locationName, dateTime } = weatherDTO;
        setWeatherInfo(weatherDTO);
        setSearchHistoryList([
          ...searchHistoryList,
          { locationName, dateTime },
        ]);
        setError("");
      })
      .catch(() => {
        setError("Weather Information cannot be found");
      });
  };

  const handleItemRecall = (name, dateTime) => {
    const [city, country] = name.split(",");
    handleSearch(city, country); // Update state with clicked item
  };

  const handleItemRemove = (name, dateTime) => {
    const updatedHistoryList = searchHistoryList.filter(
      (item) => !(item.locationName === name && item.dateTime === dateTime)
    );
    setSearchHistoryList(updatedHistoryList);
  };

  const getWeatherIcon = (description) => {
    switch (description) {
      case "Clouds":
      case "Rain":
        return (
          <img
            src={Cloud}
            className="weatherIcon w-48 h-48 md:w-72 md:h-72"
            alt="Cloud"
          />
        );
      case "Sun":
        return (
          <img
            src={Sun}
             className="weatherIcon w-48 h-48 md:w-72 md:h-72"
            alt="Sun"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`bg-cover ${
        searchHistoryList.length <= 1 ? "h-screen" : ""
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
            <p className="degree">{weatherInfo.temperature}&deg;</p>
            <p className="content">
              H: {weatherInfo.highTemperature}&deg; L:{" "}
              {weatherInfo.lowTemperature}&deg;
            </p>
            <div className="flex gap-4 content--light justify-between">
              <p className="content--bold">{weatherInfo.locationName}</p>
              <p>{weatherInfo.dateTime}</p>
              <p>Humidity: {weatherInfo.humidity}%</p>
              <p>{weatherInfo.description}</p>
            </div>

            {/* Search History List */}
            <div className="rounded-[24px] bg-white/20 mt-6">
              <div className="p-5">
                <p className="title">Search History</p>
                <div className="flex flex-col mt-5 gap-4">
                  {searchHistoryList.length > 0 ? (
                    sortDateTimeLastestFirst(searchHistoryList).map(
                      (history, id) => {
                        return (
                          <LocationInfoBar
                            key={id}
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
