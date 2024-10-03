type SearchHistory = {
    locationName: string,
    dateTime: string
}

type HandleItemFunction = (name: string, dateTime: string) => void

type LocationInfoBarProps = {
    name: string,
    dateTime: string,
    onItemRecall: HandleItemFunction,
    onItemRemove: HandleItemFunction
}

export type { SearchHistory, HandleItemFunction, LocationInfoBarProps } 