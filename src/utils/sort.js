const sortDateTimeLastestFirst = (array) => {
  return array.sort((a, b) => {
    // Convert dateTime strings to Date objects
    const dateA = new Date(a.dateTime);
    const dateB = new Date(b.dateTime);

    // Compare the dates (latest comes first)
    return dateB - dateA;
  });;
};

export { sortDateTimeLastestFirst };
