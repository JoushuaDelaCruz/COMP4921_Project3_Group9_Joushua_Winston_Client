import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import useRequest from "./customs/useRequest";

const profile = ({ userAuth }) => {
  const [loader] = useLoaderData();
  const [isAdded, setIsAdded] = useState(loader.is_added == 1);
  const { postRequest } = useRequest();
  const addFriendHandler = async () => {
    const endpoint = `profile/addFriend/${loader.username}`;
    const response = await postRequest(endpoint);
    if (response.success) {
      setIsAdded(true);
    } else {
      alert(response.message);
    }
  };
  return (
    <div>
      <header>Profile Page</header>
      <h1>{loader.username}</h1>
      {userAuth && (
        <div>
          {isAdded ? (
            <button className=" px-4 py-2 bg-green-600 w-fit">Added</button>
          ) : (
            <button
              onClick={addFriendHandler}
              className="px-4 py-2 bg-blue-600 w-fit"
            >
              Add Friend
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default profile;
