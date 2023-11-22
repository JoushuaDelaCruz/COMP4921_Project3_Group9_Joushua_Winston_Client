import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="h-screen w-screen flex flex-col items-center gap-5 justify-center bg-mint-cream">
      <h1 className="font-roboto text-battleship-grey text-center hidden md:block m-5 text-4xl border-b-2 border-ash-grey pb-3">
        Your Personal Event Planner
      </h1>
      <section className="flex flex-col gap-4 md:flex-row md:gap-6">
        <div className="bg-transparent flex flex-col items-center gap-1">
          <h2 className="font-logo text-center text-7xl text-celadon md:hidden">
            MakeItHappen
          </h2>
          <h1 className="font-roboto text-xl text-ash-grey text-center md:hidden">
            Your personal event planner
          </h1>
          <img
            src="./public/assets/MakeItHappenWelcome.png"
            className="w-72 md:w-96"
            alt=""
          />
        </div>
        <div className="flex flex-col items-center text-center gap-1 md:ring-2 md:ring-battleship-grey/10 md:py-4 px-10 md:shadow-md md:rounded-md md:bg-white">
          <h2 className="font-logo text-center text-5xl text-celadon hidden md:m-5 md:block md:mb-5">
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

export default Home;
