export const formatDateForChannelList = (dateObject) => {
  const currentDate = new Date();
  if (datesAreOnSameDay(currentDate, dateObject)) {
    // console.log("1st if")
    return getFormattedTimeString(dateObject);
  } else if (checkIfDateIsOneDayAgo(dateObject)) {
    return "1 day ago";
  } else {
    return getDateAndMonthString(dateObject);
  }
}

const datesAreOnSameDay = (first, second) => {
  return first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();
}

export const getFormattedTimeString = (dateObject) => {
  var hours = dateObject.getHours();
  var minutes = dateObject.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

const checkIfDateIsOneDayAgo = (dateToCheck) => {
  var yesterday = new Date((new Date()).valueOf() - 1000 * 60 * 60 * 24);
  // console.log(yesterday);
  return datesAreOnSameDay(yesterday, dateToCheck);
}

const getDateAndMonthString = (dateObject) => {
  const monthString = dateObject.toLocaleString('default', { month: 'short' })
  const dateString = dateObject.getDate();
  return dateString + " " + monthString
}
