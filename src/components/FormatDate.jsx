const DateFormatter = ({ dateString }) => {
  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  return <span>{formatDateString(dateString)}</span>;
};

export default DateFormatter;
