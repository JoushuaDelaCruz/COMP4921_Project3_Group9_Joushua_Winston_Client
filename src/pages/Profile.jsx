import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import NavBar from "./components/NavBar";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import AddFriendCard from "./components/AddFriendCard";
import useRequest from "./customs/useRequest";
import FriendCard from "./components/ProfileFriendCard";
import CreateGroupModal from "./components/CreateGroupModal";
import { GroupCard } from "./components/GroupCard";

const Profile = ({ user }) => {
  const [friends, setFriends] = useState(useLoaderData());
  const [recommendedFriends, setRecommendedFriends] = useState([]);
  const [isAddUserTitleHidden, setIsAddUserTitleHidden] = useState(false);
  const [addUserAnimation, setAddUserAnimation] = useState("");
  const [searchBarAnimation, setSearchBarAnimation] = useState("opacity-0 w-0");
  const [searchFriendName, setSearchFriendName] = useState("");
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [groups, setGroups] = useState([]);

  const addGroup = (group) => {
    const newGroups = [...groups, group];
    setGroups(newGroups);
  };

  const { getRequest, postRequest, logOutRequest } = useRequest();
  const cld = new Cloudinary({
    cloud: { cloudName: import.meta.env.VITE_CLOUD_NAME },
  });

  const removeRecommendedFriend = (id) => {
    const newRecommendedFriends = recommendedFriends.filter(
      (friend) => friend.user_id !== id
    );
    setRecommendedFriends(newRecommendedFriends);
  };

  useEffect(() => {
    const getRandomFriends = async () => {
      const response = await getRequest("profile/randomUsers");
      setRecommendedFriends(response);
    };
    const getGroups = async () => {
      const response = await getRequest("profile/groups");
      setGroups(response);
    };
    getRandomFriends();
    getGroups();
  }, []);

  const searchFriendEnterListener = (e) => {
    if (e.key === "Enter") {
      searchFriends();
    }
  };

  const searchFriends = async () => {
    const response = await getRequest(
      `profile/searchFriends?name=${searchFriendName}`
    );
    setSearchFriendName("");
    setRecommendedFriends(response);
  };

  const showSearchBar = () => {
    setIsAddUserTitleHidden(true);
    setAddUserAnimation(
      "opacity-0 blur-sm -translate-x-full transition-all duration-1000"
    );
    setTimeout(() => {
      setAddUserAnimation("hidden");
      setSearchBarAnimation(
        "opacity-100 blur-none translate-y-0 transition-all duration-1000 w-full"
      );
    }, 1000);
  };

  const hideAddUserTitle = () => {
    if (isAddUserTitleHidden) {
      searchFriends();
      return;
    }
    showSearchBar();
  };

  const addFriendToFriendsAdded = (friend) => {
    friend.date_added = new Date();
    friend.accepted = 0;
    const newFriends = [...friends, friend];
    setFriends(newFriends);
  };

  const addFriend = (friend) => {
    const response = postRequest("profile/addFriend", {
      friend_id: friend.user_id,
    });
    if (response) {
      removeRecommendedFriend(friend.user_id);
      addFriendToFriendsAdded(friend);
    }
  };

  const closeCreateGroupModal = () => {
    setShowCreateGroupModal(false);
  };

  return (
    <main className="h-screen min-h-screen w-screen gap-5 relative flex flex-col md:flex-row bg-mint-cream font-roboto">
      <nav className="w-full px-2 py-3 border-b shadow-md text-center bg-white md:hidden">
        <h1 className="text-3xl font-logo font-semibold text-celadon">
          MakeItHappen
        </h1>
      </nav>
      <NavBar currentPage={3} />
      <section className="flex-1 flex flex-col gap-5 mx-2 md:py-6 md:flex-row md:justify-center lg:gap-20 md:mt-8">
        <header className="flex flex-col w-full gap-4 items-center md:order-2 md:mt-10 max-w-xs">
          <div className="flex items-center w-full gap-2">
            <AdvancedImage
              cldImg={cld.image(user.image)}
              className="w-14 h-12 rounded-full ring-1 ring-gray-300 overflow-hidden object-cover"
            />
            <h1 className="border-b border-ash-grey w-full flex justify-between px-2 capitalize font-medium text-feldgrau">
              Hi, {user.username}!
              <button
                className="p-1 text-battleship-grey rounded-md hover:bg-slate-200 focus:bg-slate-300"
                onClick={logOutRequest}
              >
                <i className="fa-solid fa-arrow-right-from-bracket fa-lg"></i>
              </button>
            </h1>
          </div>
          <div className="flex w-full items-center gap-2 justify-between">
            <h1
              className={`whitespace-nowrap font-semibold text-gray-600 text-base ${
                isAddUserTitleHidden && addUserAnimation
              }`}
            >
              Add Friends
            </h1>
            <div
              className={`flex min-w-fit border border-gray-300 flex-1 justify-end ${
                isAddUserTitleHidden
                  ? "border-opacity-100 blur-none translate-y-0 transition-all duration-1000"
                  : "border-opacity-0"
              } rounded-md text-sm`}
            >
              <button
                onClick={hideAddUserTitle}
                className={`p-2 shadow-inner rounded-md bg-white flex justify-center ${
                  !isAddUserTitleHidden && "border border-gray-300"
                }`}
              >
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
              <input
                type="text"
                onKeyDown={searchFriendEnterListener}
                onChange={(e) => setSearchFriendName(e.target.value)}
                value={searchFriendName}
                className={`py-1 px-2 rounded-md ${searchBarAnimation} focus:outline-none focus:ring-1 focus:ring-battleship-grey`}
                placeholder="Search Friends"
              />
            </div>
          </div>
          <section className="flex flex-row gap-4 overflow-x-scroll py-2 w-full md:flex-col md:overflow-visible">
            {recommendedFriends ? (
              recommendedFriends.map((friend) => {
                return (
                  <AddFriendCard
                    key={`recommended-${friend.user_id}`}
                    image={cld.image(friend.image)}
                    user={friend}
                    removeRecommendedFriend={removeRecommendedFriend}
                    addFriend={addFriend}
                  />
                );
              })
            ) : (
              <h1 className="text-xs font-bold text-ash-grey w-full text-center">
                No recommended friends
              </h1>
            )}
          </section>
          <div className="flex w-full items-center gap-2">
            <div className="flex w-full gap-2 text-sm justify-between items-center">
              <h1 className="font-semibold text-gray-600 text-lg">Groups</h1>
              <button
                onClick={() => setShowCreateGroupModal(true)}
                className={`p-2 shadow-inner rounded-md bg-white flex justify-center border border-gray-300 hover:bg-slate-200 focus:bg-slate-300 active:bg-slate-400 transition-all duration-300`}
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>
          <section className="flex flex-row gap-4 overflow-x-scroll py-2 w-full md:flex-col md:overflow-visible">
            {groups ? (
              groups.map((group, index) => {
                return <GroupCard key={`group-${index}`} group={group} />;
              })
            ) : (
              <h1> No Groups Found </h1>
            )}
          </section>
        </header>
        <section className="flex flex-col gap-2 md:flex-1 md:max-w-xl">
          <h1 className="font-semibold px-4 text-mint-cream bg-feldgrau rounded-lg py-1">
            Friends & Status
          </h1>
          <div className="flex flex-col py-3 gap-3">
            {friends ? (
              friends.map((friend, index) => {
                return (
                  <FriendCard
                    key={`friend-${index}`}
                    friend={friend}
                    image={cld.image(friend.image)}
                    index={index}
                  />
                );
              })
            ) : (
              <h1 className="text-xs font-bold w-full text-center">
                Add more friends!
              </h1>
            )}
          </div>
        </section>
      </section>
      {showCreateGroupModal && (
        <CreateGroupModal close={closeCreateGroupModal} addGroup={addGroup} />
      )}
    </main>
  );
};

export default Profile;
