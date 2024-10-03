import { ReactComponent as SearchIcon } from "assets/searchHistory-icon.svg";
import { ReactComponent as RemoveIcon } from "assets/delete-icon.svg";
import "./LocationInfoBar.scss";

type LocationInfoBarProps = {
  name: string,
  dateTime: string,
  onItemRecall: (name: string, dateTime: string) => void,
  onItemRemove: (name: string, dateTime: string) => void
}

function LocationInfoBar({ name, dateTime, onItemRecall, onItemRemove }: LocationInfoBarProps) {
  return (
    <div className="flex rounded-[16px] bg-white/20 p-5 w-full justify-between items-center gap-4">
      <div className="flex gap-4 items-center flex-col md:flex-row size-full justify-between">
        <p className="size-full md:size-auto">{name}</p>
        <p className="text-xs md:text-sm size-full md:size-auto">{dateTime}</p>
      </div>
      <div className="flex gap-4 items-center">
        <button
          className="historyBtn--light"
          onClick={() => onItemRecall(name, dateTime)}
        >
          <SearchIcon />
        </button>
        <button
          className="historyBtn--light"
          onClick={() => onItemRemove(name, dateTime)}
        >
          <RemoveIcon />
        </button>
      </div>
    </div>
  );
}

export default LocationInfoBar;
