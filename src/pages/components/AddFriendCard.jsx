import React, { useState } from "react";
import { AdvancedImage } from "@cloudinary/react";
import useDateFormat from "../customs/useDateFormat";

const AddFriendCard = ({ user, removeRecommendedFriend, addFriend, image }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [relativeTime] = useDateFormat(user.date_created);

  const removeFriend = () => {
    removeRecommendedFriend(user.user_id);
  };

  const addUser = () => {
    addFriend(user);
  };

  return (
    <div className="min-w-fit opacity-100 blur-none translate-y-0 transition-all duration-1000">
      <div
        className={`flex flex-row items-center rounded-full shadow-md transition-all duration-500 ${
          isExpanded ? "w-80 bg-slate-200" : "w-52 bg-transparent"
        }`}
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
        disabled={isExpanded}
      >
        <div className="flex h-16 w-full min-w-fit items-center bg-white rounded-full gap-2 overflow-visible px-3 shadow-inner">
          <AdvancedImage
            cldImg={image}
            className="w-12 h-12 rounded-full ring-1 ring-gray-400 overflow-hidden object-cover"
          />
          <div className="flex flex-col justify-center">
            <h1 className="text-sm text-feldgrau font-medium">
              {user.username}
            </h1>
            <h2 className="text-xs text-ash-grey"> Joined: {relativeTime}</h2>
          </div>
        </div>
        <div
          className={`flex rounded-full justify-center items-center gap-2 p-2 ${
            !isExpanded && "w-0 hidden"
          }`}
        >
          <button
            className={`flex items-center justify-center p-3 bg-white rounded-full text-green-700 border border-green-700 transition-all duration-1000 ${
              isExpanded ? "opacity-100" : "opacity-0"
            }`}
            onClick={addUser}
          >
            <i className="fa-solid fa-plus"></i>
          </button>
          <button
            className={`flex items-center justify-center p-3 bg-white rounded-full text-red-800 border border-red-800 transition-all duration-1000 ${
              isExpanded ? "opacity-100" : "opacity-0"
            }`}
            onClick={removeFriend}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFriendCard;
