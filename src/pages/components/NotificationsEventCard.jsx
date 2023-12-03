import React from "react";

const NotificationsEventCard = ({ isEvents }) => {
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
          <img
            src="/assets/cutie-patoty.jpg"
            className="w-14 h-12 rounded-lg ring-1 ring-gray-500 overflow-hidden object-cover"
          />
          <div className="flex flex-row justify-between w-full align-middle text-base h-12">
            <h1 className="font-bold capitalize">Winston</h1>
            <h2 className="text-xs text-gray-600">Requested 2hr ago</h2>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm mr-2 text-feldgrau">
          <div className="flex flex-col gap-1 w-fit">
            <h1 className="font-bold">Event: Drinking in 2hrs</h1>
            <h2>Created: 2 hrs ago </h2>
            <h2>Start: 2 days from now </h2>
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
