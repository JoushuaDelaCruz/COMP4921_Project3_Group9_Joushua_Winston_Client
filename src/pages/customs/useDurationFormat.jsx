import { useState, useEffect } from "react";

const useEventDuration = (startDate, endDate) => {
  const [duration, setDuration] = useState("");

  useEffect(() => {
    if (startDate && endDate) {
      const startDateTime = new Date(startDate);
      const endDateTime = new Date(endDate);

      const durationInMilliseconds = endDateTime - startDateTime;
      const durationInSeconds = durationInMilliseconds / 1000;
      const durationInMinutes = durationInSeconds / 60;
      const durationInHours = durationInMinutes / 60;
      const durationInDays = durationInHours / 24;
      const durationInWeeks = durationInDays / 7;
      const durationInMonths = durationInDays / 30;

      if (durationInMonths >= 1) {
        setDuration(
          `${Math.floor(durationInMonths)} ${
            Math.floor(durationInMonths) === 1 ? "month" : "months"
          }`
        );
      } else if (durationInWeeks >= 1) {
        setDuration(
          `${Math.floor(durationInWeeks)} ${
            Math.floor(durationInWeeks) === 1 ? "week" : "weeks"
          }`
        );
      } else if (durationInDays >= 1) {
        setDuration(
          `${Math.floor(durationInDays)} ${
            Math.floor(durationInDays) === 1 ? "day" : "days"
          }`
        );
      } else if (durationInHours >= 1) {
        setDuration(
          `${Math.floor(durationInHours)} ${
            Math.floor(durationInHours) === 1 ? "hour" : "hours"
          }`
        );
      } else {
        setDuration(
          `${Math.floor(durationInMinutes)} ${
            Math.floor(durationInMinutes) === 1 ? "minute" : "minutes"
          }`
        );
      }
    }
  }, [startDate, endDate]);

  return [duration];
};

export default useEventDuration;
