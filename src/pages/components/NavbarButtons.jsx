import { useState } from "react";

const NavbarButtons = ({ icon, isActive, order, description }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <button
      disabled={isActive}
      className={`p-2 text-feldgrau rounded-full gap-5 sm:${order} sm:flex sm:items-center sm:rounded-md`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <i
        className={`${
          isHovered || isActive ? "fa-solid" : "fa-regular"
        } ${icon} fa-xl`}
      ></i>
      <h2
        className={`hidden sm:block ${
          (isHovered || isActive) && "font-semibold"
        }`}
      >
        {" "}
        {description}{" "}
      </h2>
    </button>
  );
};

export default NavbarButtons;
