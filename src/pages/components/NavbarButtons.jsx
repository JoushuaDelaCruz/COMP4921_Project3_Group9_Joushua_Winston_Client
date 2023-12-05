import { useState } from "react";
import { Link } from "react-router-dom";

const NavbarButtons = ({ icon, isActive, order, description, link }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Link
      to={link}
      disabled={isActive}
      className={`p-2 text-feldgrau rounded-full gap-5 md:order-${order} md:flex md:items-center md:rounded-md`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <i
        className={`${
          isHovered || isActive ? "fa-solid" : "fa-regular"
        } ${icon} fa-xl`}
      ></i>
      <h2
        className={`hidden md:block capitalize ${
          (isHovered || isActive) && "font-semibold"
        }`}
      >
        {" "}
        {description}{" "}
      </h2>
    </Link>
  );
};

export default NavbarButtons;
