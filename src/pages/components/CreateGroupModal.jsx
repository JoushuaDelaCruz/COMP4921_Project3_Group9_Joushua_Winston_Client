import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import useRequest from "../customs/useRequest";

const CreateGroupModal = ({ close }) => {
  const [name, setName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const { getRequest, postRequest } = useRequest();
  const loadMembers = async (memberName, callback) => {
    const result = await getRequest(
      `profile/searchAcceptedFriends?name=${memberName}`
    );
    callback(result);
  };

  const createGroup = async () => {
    if (selectedMembers.length < 1) {
      return;
    }
    const data = { group_name: name, members: selectedMembers };
    const result = await postRequest("profile/createGroup", data);
    if (result) {
      close();
    }
  };

  return (
    <div className="absolute left-0 top-0 w-screen h-screen bg-zinc-700/50 flex flex-col z-50 justify-center items-center">
      <div className="flex flex-col bg-mint-cream p-4 mx-4 sm:mx-0 rounded-lg w-full max-w-lg text-sm gap-5">
        <header className="flex items-center justify-between pb-6">
          <h1 className="text-lg"> Create a new group </h1>
          <button
            className="text-red-700 hover:bg-red-500 hover:text-white py-1 px-2 rounded-md"
            onClick={close}
          >
            <i className="fa-solid fa-xmark fa-lg"></i>
          </button>
        </header>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-1">
            <h2 htmlFor="group-name" className="flex-1 whitespace-nowrap">
              Group Name:
            </h2>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter a group name"
              className="p-1 w-full bg-transparent border-b border-gray-400 focus:border-gray-600 focus:outline-none"
            />
          </div>
          <div className="flex flex-col justify-center gap-4">
            <span className="bg-feldgrau w-1/4 h-1 mx-auto my-4"></span>
            <div className="flex items-center gap-1">
              <AsyncSelect
                placeholder="Select a member"
                className="w-full"
                isSearchable={true}
                isMulti={true}
                loadOptions={loadMembers}
                defaultValue={selectedMembers}
                onChange={setSelectedMembers}
              />
            </div>
          </div>
        </div>
        <footer className="flex justify-end">
          <button
            className="bg-slate-700 hover:bg-slate-600 text-white rounded-md py-2 px-4"
            onClick={createGroup}
          >
            Create Group
          </button>
        </footer>
      </div>
    </div>
  );
};

export default CreateGroupModal;
