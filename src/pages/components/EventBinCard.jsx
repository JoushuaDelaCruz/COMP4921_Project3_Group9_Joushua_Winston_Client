import React, { useState } from "react";
import { useEffect } from "react";

const EventBinCard = ({ index }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 250 * index);
    return () => clearTimeout(timeout);
  }, []);

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
          Event: Drinking @ 2
        </h1>
        <h2 className="text-xs italic"> Deleted 6 days ago </h2>
      </header>
      <div className="flex flex-col gap-1 text-sm">
        <h2> Created: 10 days ago </h2>
        <h2> Starts in 5 days </h2>
        <h2> Duration: 2 hours </h2>
        <p className="font-light">
          <span className="font-normal">Description:</span> Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Perspiciatis dolorem commodi
          quibusdam,
        </p>
      </div>
      <footer className="flex gap-2 mt-2">
        <button className="px-6 py-2 w-full bg-celadon/60 cursor-pointer rounded-md hover:bg-celadon/80 active:bg-celadon/90 focus:outline-none focus:ring focus:ring-celadon transition-all duration-300">
          {" "}
          Restore{" "}
        </button>
        <button className="px-6 py-2 w-full rounded-md cursor-pointer bg-ash-grey/60 hover:bg-ash-grey/80 active:bg-ash-grey/90 focus:outline-none focus:ring focus:ring-ash-grey transition-all duration-300">
          {" "}
          Delete{" "}
        </button>
      </footer>
    </article>
  );
};

export default EventBinCard;
