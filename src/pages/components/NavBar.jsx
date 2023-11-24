import React from "react";
import NavbarButtons from "./NavbarButtons";

const NavBar = ({}) => {
  return (
    <div className="fixed bottom-0 w-full flex bg-white px-5 py-2 border-t border-ash-grey sm:relative sm:bottom-auto sm:w-60 sm:flex-col sm:justify-start sm:gap-3 sm:border-r sm:border-t-0">
      <div className="hidden sm:block py-4">
        <h1 className="text-3xl font-logo font-semibold text-celadon">
          MakeItHappen
        </h1>
      </div>
      <div className="flex justify-between w-full sm:justify-start sm:flex-col gap-5">
        <NavbarButtons
          icon={"fa-bell"}
          order={2}
          isActive={false}
          description={"notifications"}
        />
        <NavbarButtons
          icon="fa-calendar"
          isActive={true}
          order={1}
          description={"calendar"}
        />
        <NavbarButtons
          icon={"fa-user"}
          order={3}
          isActive={false}
          description={"profile"}
        />
      </div>
    </div>
  );
};

export default NavBar;
