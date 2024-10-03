import { ReactComponent as SearchIcon } from "assets/search-icon.svg";
import React, { useState } from "react";
import { HandleItemFunction } from "../../../utils/typeUtils";

type SearchBarProps = {
  errorMessage: string,
  handleSearch: HandleItemFunction
}

function SearchBar({ errorMessage = "", handleSearch }: SearchBarProps) {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  return (
    <div className="flex flex-col w-full">
      <div className="flex gap-4 w-full mt-6 items-center h-12">
        <label className="hidden md:block">City: </label>
        <input
          value={city}
          className="search bg-white/80 h-full w-full pl-5 rounded-[8px] md:rounded-[20px] py-5 md:py-0"
          name="city"
          placeholder="Enter city"
          onChange={(e) => setCity(e.target.value)}
        />
        <label className="hidden md:block">Country: </label>
        <input
          value={country}
          className="search bg-white/80 h-full w-full pl-5 rounded-[8px] md:rounded-[20px]"
          name="country"
          placeholder="Enter country"
          onChange={(e) => setCountry(e.target.value)}
        />
        <button
          className="searchBtn bg-[--purple-500] rounded-[8px] md:rounded-[20px]"
          onClick={() =>
            handleSearch(city, country)
          }
        >
          <SearchIcon />
        </button>
      </div>
      {errorMessage && <p className="text-red-500 bg-white/50 h-full w-full p-4 rounded-[8px] mt-5 border-l-4 border-red-500">
        {errorMessage}
      </p>}
    </div>
  );
}

export default SearchBar;
