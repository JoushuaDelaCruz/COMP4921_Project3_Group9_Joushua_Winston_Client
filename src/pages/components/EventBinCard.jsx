import React, { useState } from "react";
import { useEffect } from "react";
import useEventCountDown from "../customs/useEventCountDown";
import useEventDuration from "../customs/useDurationFormat";
import useRequest from "../customs/useRequest";

const EventBinCard = ({ index, event, removeEvent }) => {
  const { postRequest, deleteRequest } = useRequest();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 250 * index);
    return () => clearTimeout(timeout);
  }, [setIsLoading]);
  
  const handleRestore = async () => {
    const result = await postRequest("recycle/restoreEvent", {uuid: event.uuid});
    if (!result) alert("Couldn't restore event. Please try again later.")
    handleRemoveEvent();
  }

  const handleDelete = async () => {
    const result = await deleteRequest("recycle/deleteEvent", {uuid: event.uuid});
    if (!result) alert("Couldn't delete event. Please try again later.")
    handleRemoveEvent();
  }

  const handleRemoveEvent = () => {
    removeEvent(event.uuid);
  }

  return (
    <article
      className={`bg-white w-full flex flex-col gap-2 text-battleship-grey subpixel-antialiased text-sm p-2 rounded-md ring-1 ring-slate-400 shadow-md transition-all duration-1000
      ${
        isLoading
          ? "opacity-0 blur-sm translate-x-full"
          : "opacity-100 blur-none translate-y-0"
      }
      `}
    >
      <header className="flex justify-between items-center">
        <h1 className="text-base font-bold text-gray-600">
          Event: {event.title}
        </h1>
        <h2 className="text-xs italic"> Deleted {useEventDuration(event.recycle_datetime, new Date())} ago </h2>
      </header>
      <div className="flex flex-col gap-1 text-sm">
        <h2> Location: {event.location} </h2>
        <h2> Created: {useEventDuration(event.created_datetime, new Date())} </h2>
        <h2> {useEventCountDown(event.start_datetime)} </h2>
        <h2> Duration: {useEventDuration(event.start_datetime, event.end_datetime)} </h2>
        <p className="font-light">
          <span className="font-normal">Description:</span> {event.description}
        </p>
      </div>
      <footer className="flex gap-2 mt-2">
        <button onClick={handleRestore} className="px-6 py-2 w-full bg-celadon/60 cursor-pointer rounded-md hover:bg-celadon/80 active:bg-celadon/90 focus:outline-none focus:ring focus:ring-celadon transition-all duration-300">
          {" "}
          Restore{" "}
        </button>
        <button onClick={handleDelete} className="px-6 py-2 w-full rounded-md cursor-pointer bg-ash-grey/60 hover:bg-ash-grey/80 active:bg-ash-grey/90 focus:outline-none focus:ring focus:ring-ash-grey transition-all duration-300">
          {" "}
          Delete{" "}
        </button>
      </footer>
    </article>
  );
};

export default EventBinCard;
