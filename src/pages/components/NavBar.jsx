import React from "react";
import NavbarButtons from "./NavbarButtons";

const NavBar = ({ currentPage }) => {
  const pages = [
    {
      id: 2,
      icon: "fa-calendar",
      order: 1,
      description: "calendar",
    },
    {
      id: 1,
      icon: "fa-bell",
      order: 2,
      description: "notifications",
    },
    {
      id: 3,
      icon: "fa-user",
      order: 3,
      description: "profile",
    },
  ];

  return (
    <nav className="fixed bottom-0 w-full md:h-full flex bg-white px-5 py-2 border-t z-50 border-ash-grey md:relative md:bottom-auto md:w-60 md:flex-col md:justify-start md:gap-3 md:border-r md:border-t-0">
      <div className="hidden md:block py-4">
        <h1 className="text-3xl font-logo font-semibold text-celadon">
          MakeItHappen
        </h1>
      </div>
      <div className="flex justify-between w-full md:justify-start md:flex-col gap-5">
        {pages.map((page) => (
          <NavbarButtons
            key={page.id}
            icon={page.icon}
            order={page.order}
            isActive={currentPage === page.id}
            description={page.description}
          />
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
