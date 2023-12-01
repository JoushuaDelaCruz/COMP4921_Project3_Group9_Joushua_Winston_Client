import React from "react";
import { AdvancedImage } from "@cloudinary/react";
import useDateFormat from "../customs/useDateFormat";

const FriendCard = ({ friend, image }) => {
  const [relativeTime] = useDateFormat(friend.date_added);

  return (
    <div className="bg-white flex overflow-visible items-center border border-ash-grey rounded-full gap-2 shadow-md">
      <AdvancedImage
        cldImg={image}
        className="w-16 h-14 rounded-full ring-1 ring-gray-300 overflow-hidden object-cover"
      />
      <div className="flex justify-between w-full pr-6">
        <div className="flex flex-col">
          <h1 className="text-sm font-semibold text-feldgrau capitalize">
            {friend.username}
          </h1>
          <h2 className="text-xs text-ash-grey">Added {relativeTime}</h2>
        </div>
        {friend.accepted === 0 ? (
          <div className="flex flex-col items-center justify-between text-green-800">
            <i className="fa-solid fa-paper-plane"></i>
            <h3 className="text-xs">Pending</h3>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-between text-blue-800">
            <i className="fa-solid fa-user-plus"></i>
            <h3 className="text-xs">Accepted</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendCard;
