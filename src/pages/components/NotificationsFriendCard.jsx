import React from "react";
import { AdvancedImage } from "@cloudinary/react";
import useDateFormat from "../customs/useDateFormat";
import useRequest from "../customs/useRequest";

const NotificationsFriendCard = ({
  isFriend,
  profile_img,
  friend,
  removeFriendRequest,
}) => {
  const { patchRequest, deleteRequest } = useRequest();
  const [relativeTime] = useDateFormat(friend.date_added);

  const acceptFriend = async () => {
    const { success } = await patchRequest(
      `notifications/friend/accept?friend=${friend.friend_id}`
    );
    if (success) {
      removeFriendRequest(friend.friend_id);
    }
  };

  const declineFriend = async () => {
    const success = await deleteRequest(
      `notifications/friend/decline?friend=${friend.friend_id}`
    );
    if (success) {
      removeFriendRequest(friend.friend_id);
    }
  };

  return (
    <div
      className={`bg-white w-full flex gap-2 p-2 rounded-md ring-1 ring-slate-400 shadow-md ${
        isFriend
          ? "opacity-0 blur-sm -translate-x-full transition-all duration-1000"
          : "opacity-100 blur-none translate-y-0 transition-all duration-1000"
      }`}
    >
      <AdvancedImage
        cldImg={profile_img}
        className="w-14 h-12 rounded-lg ring-1 ring-gray-500 overflow-hidden object-cover"
      />
      <section className="flex justify-between w-full">
        <div className="flex flex-col justify-between text-base">
          <h1 className="font-bold capitalize">{friend.username}</h1>
          <h2 className="text-xs text-gray-600">Requested {relativeTime}</h2>
        </div>
        <div className="flex justify-between items-center gap-2 text-sm mr-2 text-feldgrau">
          <button
            className="px-6 py-2 bg-celadon/60 rounded-md hover:bg-celadon/80 active:bg-celadon/90 focus:outline-none focus:ring focus:ring-celadon transition-all duration-300"
            onClick={acceptFriend}
          >
            {" "}
            Confirm{" "}
          </button>
          <button
            className="px-6 py-2 rounded-md bg-ash-grey/60 hover:bg-ash-grey/80 active:bg-ash-grey/90 focus:outline-none focus:ring focus:ring-ash-grey transition-all duration-300"
            onClick={declineFriend}
          >
            {" "}
            Delete{" "}
          </button>
        </div>
      </section>
    </div>
  );
};

export default NotificationsFriendCard;
