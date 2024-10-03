const formatDateTime = (dateString: Date): string => {
  const date = new Date(dateString);

  return date.toLocaleString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).replace(/\//g, '-');
};

export { formatDateTime };
