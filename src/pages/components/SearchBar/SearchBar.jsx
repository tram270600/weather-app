import { ReactComponent as SearchIcon } from "../../../assets/search-icon.svg";
import React, { useRef } from "react";

function SearchBar({ errorMessage = "", handleSearch }) {
  const cityInputRef = useRef(null);
  const countryInputRef = useRef(null);

  return (
    <div className="flex flex-col w-full">
      <div className="flex gap-4 w-full mt-6 items-center h-12">
          <label className="hidden md:block">City: </label>
          <input
            ref={cityInputRef}
            className="search bg-white/80 h-full w-full pl-5 rounded-[8px] md:rounded-[20px] py-5 md:py-0"
            name="city"
            placeholder="Enter city"
          />
            <label className="hidden md:block">Country: </label>
            <input
              ref={countryInputRef}
              className="search bg-white/80 h-full w-full pl-5 rounded-[8px] md:rounded-[20px]"
              name="country"
              placeholder="Enter country"
            />
          <button
            className="searchBtn bg-[--purple-500] rounded-[8px] md:rounded-[20px]"
            onClick={() =>
              handleSearch(
                cityInputRef.current.value,
                countryInputRef.current.value
              )
            }
          >
            <SearchIcon />
          </button>
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
}

export default SearchBar;
