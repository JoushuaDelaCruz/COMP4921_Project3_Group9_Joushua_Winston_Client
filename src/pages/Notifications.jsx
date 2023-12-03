import React, { useState } from "react";
import NavBar from "./components/NavBar";
import NotificationsFriendCard from "./components/NotificationsFriendCard";
import { useLoaderData } from "react-router-dom";
import { Cloudinary } from "@cloudinary/url-gen";
import NotificationsEventCard from "./components/NotificationsEventCard";

const Notifications = () => {
  const [friendRequests, setFriendRequests] = useState(useLoaderData());

  const [toggle, setToggle] = useState(false);

  const toggleNotifications = () => {
    setToggle(!toggle);
  };

  const removeFriendRequest = (id) => {
    const newFriendRequests = friendRequests.filter(
      (friend) => friend.friend_id !== id
    );
    setFriendRequests(newFriendRequests);
  };

  const cld = new Cloudinary({
    cloud: { cloudName: import.meta.env.VITE_CLOUD_NAME },
  });
  return (
    <main className="h-screen min-h-screen w-screen gap-5 relative flex flex-col md:items-start items-center md:flex-row bg-mint-cream overflow-hidden font-roboto">
      <nav className="w-full px-2 py-3 border-b shadow-md text-center bg-white md:hidden">
        <h1 className="text-3xl font-logo font-semibold text-celadon">
          MakeItHappen
        </h1>
      </nav>
      <NavBar currentPage={1} />
      <section className="flex flex-col justify-center items-center w-full px-2 gap-10 md:py-10 h-full">
        <header className="flex w-fit p-2 gap-1 justify-center rounded-lg bg-feldgrau text-xs shadow-md shadow-slate-800">
          <button
            onClick={toggleNotifications}
            className={`p-3 rounded-lg transition-all duration-500 ring-2 ${
              !toggle
                ? "bg-mint-cream ring-slate-700"
                : "text-ash-grey bg-none ring-transparent"
            } shadow-inner`}
            type="submit"
            disabled={!toggle}
          >
            Friends
          </button>
          <button
            onClick={toggleNotifications}
            className={`p-3 rounded-lg transform transition-all duration-500 ring-2 ${
              toggle
                ? "bg-mint-cream ring-slate-700"
                : " text-ash-grey bg-none ring-transparent"
            }`}
            type="submit"
            disabled={toggle}
          >
            Events
          </button>
        </header>
        <div className="flex flex-col items-center w-full max-w-lg px-2 gap-3 h-full relative flex-nowrap">
          <div
            className={`flex flex-col w-full items-center max-w-lg gap-3 h-fit relative`}
          >
            {friendRequests.length > 0 ? (
              friendRequests.map((friend) => {
                return (
                  <NotificationsFriendCard
                    friend={friend}
                    key={`friend-${friend.friend_id}`}
                    profile_img={cld.image(friend.image)}
                    isFriend={toggle}
                    removeFriendRequest={removeFriendRequest}
                  />
                );
              })
            ) : (
              <h1 className="text-ash-grey">
                {" "}
                You have no friends requests yet
              </h1>
            )}
          </div>
          <div
            className={`flex flex-col w-full items-center max-w-lg gap-3 h-fit absolute`}
          >
            <NotificationsEventCard isEvents={!toggle} />
            <NotificationsEventCard isEvents={!toggle} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Notifications;
