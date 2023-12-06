import React, { useState, useEffect } from "react";
import useDateFormat from "../customs/useDateFormat";

export const GroupCard = ({ group }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [relativeTime] = useDateFormat(group.created_datetime);

  const closeModal = () => {
    setShowGroupModal(false);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 250);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <div
        onClick={() => setShowGroupModal(true)}
        className={`flex flex-col w-full blur-none transition-all text-sm duration-1000 border text-feldgrau bg-white shadow-md p-2 rounded-lg gap-1 ${
          isLoading
            ? "opacity-0 blur-sm translate-x-full"
            : "opacity-100 blur-none translate-y-0"
        }`}
      >
        <h1 className="text-sm font-bold">{group.group_name}</h1>
        <div className="flex justify-between">
          <h2 className="text-xs"> Created: {relativeTime} </h2>
          <h2 className="text-xs"> Members: {group.num_members} </h2>
        </div>
      </div>
    </>
  );
};
