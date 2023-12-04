import { useState, useEffect } from "react";

const useEventCountDown = (futureTimestamp) => {
  const [timeUntil, setTimeUntil] = useState("");

  useEffect(() => {
    function calculateTimeUntil() {
      const currentDate = new Date();
      const futureDate = new Date(futureTimestamp);
      const timeDifference = futureDate - currentDate;
      const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

      const minutesUntil = Math.floor(timeDifference / (1000 * 60));
      const hoursUntil = Math.floor(timeDifference / (1000 * 60 * 60));
      const daysUntil = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const monthsUntil = Math.floor(
        timeDifference / (1000 * 60 * 60 * 24 * 30)
      );

      if (minutesUntil < 1) {
        setTimeUntil("just now");
      } else if (minutesUntil === 1) {
        setTimeUntil("in 1 min");
      } else if (hoursUntil < 1) {
        setTimeUntil(rtf.format(minutesUntil, "minute"));
      } else if (hoursUntil === 1) {
        setTimeUntil(`starts in 1 hour`);
      } else if (
        daysUntil === 1 &&
        currentDate.getDate() !== futureDate.getDate()
      ) {
        setTimeUntil("starts tomorrow");
      } else if (daysUntil < 1) {
        setTimeUntil(`starts ${rtf.format(hoursUntil, "hour")}`);
      } else if (daysUntil === 1) {
        setTimeUntil("starts in 1 day");
      } else if (monthsUntil < 1) {
        setTimeUntil(`starts ${rtf.format(daysUntil, "day")}`);
      } else if (monthsUntil === 1) {
        setTimeUntil("starts in 1 month");
      } else {
        setTimeUntil(futureDate.toDateString());
      }
    }

    calculateTimeUntil();

    // Update the time until every minute
    const interval = setInterval(calculateTimeUntil, 60000);

    return () => clearInterval(interval);
  }, [futureTimestamp]);

  return [timeUntil];
};

export default useEventCountDown;
