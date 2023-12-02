import { Link } from "react-router-dom";
import NavBar from "./components/NavBar";
import Calendar from "../Components/CalendarComponent";

const Home = ({ user }) => {
  return user ? AuthenticatedHomePage() : NonAuthenticatedHomePage();
};

const NonAuthenticatedHomePage = () => {
  return (
    <main className="h-screen w-screen flex flex-col items-center gap-5 justify-center bg-mint-cream">
      <h1 className="font-roboto text-battleship-grey text-center hidden md:block m-5 text-4xl border-b-2 border-ash-grey pb-3">
        Your Personal Event Planner
      </h1>
      <section className="flex flex-col gap-4 md:flex-row md:gap-6">
        <div className="bg-transparent flex flex-col items-center gap-1">
          <h2 className="font-logo text-center text-5xl text-celadon font-bold md:hidden">
            MakeItHappen
          </h2>
          <h1 className="font-roboto text-xl text-ash-grey text-center md:hidden">
            Your personal event planner
          </h1>
          <img
            src="/assets/MakeItHappenWelcome.png"
            className="w-72 md:w-96"
            alt=""
          />
        </div>
        <div className="flex flex-col items-center text-center gap-1 md:ring-2 md:ring-battleship-grey/10 md:py-4 px-10 md:shadow-md md:rounded-md md:bg-white/60">
          <h2 className="font-logo text-center text-5xl font-bold text-celadon hidden md:m-5 md:block md:mb-5">
            MakeItHappen
          </h2>
          <div className="flex flex-col w-full md:h-full md:justify-center">
            <Link
              className="py-3 w-full bg-feldgrau text-mint-cream font-bold rounded-full"
              to={"/login"}
            >
              {" "}
              Login now{" "}
            </Link>
            <Link className="text-blue-600 font-semibold py-4" to={"/signUp"}>
              {" "}
              Register now{" "}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

const AuthenticatedHomePage = () => {
  return (
    <main className="h-screen min-h-screen w-screen gap-5 relative flex flex-col md:flex-row bg-mint-cream">
      <nav className="w-full px-2 py-3 border-b shadow-md text-center bg-white md:hidden">
        <h1 className="text-3xl font-logo font-semibold text-celadon">
          MakeItHappen
        </h1>
      </nav>
      <NavBar currentPage={2} />
      <section className="flex-1">
        <Calendar/>
      </section>
    </main>
  );
};

export default Home;