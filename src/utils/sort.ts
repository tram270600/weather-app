import { SearchHistory } from "./typeUtils";

const sortDateTimeLatestFirst = (array: SearchHistory[]): SearchHistory[] => {
  return array.sort((a, b) => {
    return new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime();
  });
};

export { sortDateTimeLatestFirst };
