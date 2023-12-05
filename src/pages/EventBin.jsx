import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import EventBinCard from "./components/EventBinCard";

const EventBin = () => {
  const [eventBin, setEventBin] = useState([{}, {}, {}]);

  return (
    <main className="h-screen min-h-screen w-screen gap-5 relative flex flex-col md:flex-row bg-mint-cream font-roboto">
      <nav className="w-full px-2 py-3 border-b shadow-md text-center bg-white md:hidden">
        <h1 className="text-3xl font-logo font-semibold text-celadon">
          MakeItHappen
        </h1>
      </nav>
      <NavBar currentPage={4} />
      <section className="flex flex-col items-center w-full px-2 gap-10 md:py-10 h-full">
        <h1 className="font-semibold px-4 text-mint-cream w-full text-center bg-feldgrau rounded-lg py-1">
          Deleted Events
        </h1>
        <div className="flex flex-col w-full items-center max-w-lg gap-3 h-fit">
          {eventBin.map((event, index) => {
            return <EventBinCard key={`bin-${index}`} index={index} />;
          })}
        </div>
      </section>
    </main>
  );
};

export default EventBin;
