export const getTimeStr = (totalSeconds) => {
  let minutes = parseInt(totalSeconds / 60);
  let seconds = totalSeconds % 60;
  let minuteStr = "00";
  let secondStr = "00";

  if (minutes < 10) {
    minuteStr = "0" + minutes;
  } else if (minutes >= 10) {
    minuteStr = minutes;
  }
  if (seconds < 10) {
    secondStr = "0" + seconds;
  } else if (seconds >= 10) {
    secondStr = seconds;
  }
  return minuteStr + ":" + secondStr;
};
