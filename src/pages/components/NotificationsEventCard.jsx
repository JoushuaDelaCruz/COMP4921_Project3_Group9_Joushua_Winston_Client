import React from "react";
import useEventCountDown from "../customs/useEventCountDown";
import useEventDuration from "../customs/useDurationFormat";
import useDateFormat from "../customs/useDateFormat";
import { AdvancedImage } from "@cloudinary/react";

const NotificationsEventCard = ({ isEvents, event, image }) => {
  const [timeUntil] = useEventCountDown(event.start_datetime);
  const [duration] = useEventDuration(event.start_datetime, event.end_datetime);
  const [requestedDate] = useDateFormat(event.created_datetime);

  return (
    <div
      className={`bg-white w-full flex gap-2 p-2 rounded-md ring-1 ring-slate-400 shadow-md transition-all duration-1000 ${
        isEvents
          ? "opacity-0 blur-sm translate-x-full"
          : "opacity-100 blur-none translate-y-0"
      }`}
    >
      <section className="flex flex-col justify-between w-full gap-2">
        <div className="flex flex-row gap-2">
          <AdvancedImage
            cldImg={image}
            className="w-14 h-12 rounded-lg ring-1 ring-gray-500 overflow-hidden object-cover"
          />
          <div className="flex flex-row justify-between w-full align-middle text-base h-12">
            <h1 className="font-bold capitalize">{event.inviter}</h1>
            <h2 className="text-xs text-gray-600">
              Requested: {requestedDate}
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm mr-2 text-feldgrau">
          <div className="flex flex-col gap-1 w-fit">
            <h1 className="font-bold capitalize">Event: {event.event_title}</h1>
            <h2 className="capitalize">{timeUntil} </h2>
            <h2>Duration: {duration} </h2>
          </div>
        </div>
        <div className="flex gap-2 text-sm">
          <button className="px-6 py-2 w-full bg-celadon/60 cursor-pointer rounded-md hover:bg-celadon/80 active:bg-celadon/90 focus:outline-none focus:ring focus:ring-celadon transition-all duration-300">
            {" "}
            Confirm{" "}
          </button>
          <button className="px-6 py-2 w-full rounded-md cursor-pointer bg-ash-grey/60 hover:bg-ash-grey/80 active:bg-ash-grey/90 focus:outline-none focus:ring focus:ring-ash-grey transition-all duration-300">
            {" "}
            Delete{" "}
          </button>
        </div>
      </section>
    </div>
  );
};

export default NotificationsEventCard;
