import React, { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import NavBar from "./components/NavBar";

const Profile = ({ user }) => {
  const friends = useLoaderData();

  useEffect(() => {
    console.log(user);
  }, []);
  return (
    <main className="h-screen min-h-screen w-screen gap-5 relative flex flex-col sm:flex-row bg-mint-cream">
      <nav className="w-full px-2 py-3 border-b shadow-md text-center bg-white sm:hidden">
        <h1 className="text-3xl font-logo font-semibold text-celadon">
          MakeItHappen
        </h1>
      </nav>
      <NavBar currentPage={3} />
      <section className="flex-1">hi!</section>
    </main>
  );
};

export default Profile;
