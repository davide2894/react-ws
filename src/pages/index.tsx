import LoggedHome from "@components/loggedHome/LoggedHome";
import LoggedOutHome from "@components/loggedOutHome/LoggedOutHome";
import { useAppSelector } from "@store";

function Home() {
  const userIsLogged = useAppSelector((state) => state.userReducer.isLogged);

  return (
    <>
      <div className="home">
        <div className="flex justify-center mt-10">
          {userIsLogged ? <LoggedHome /> : <LoggedOutHome />}
        </div>
      </div>
    </>
  );
}

export default Home;
