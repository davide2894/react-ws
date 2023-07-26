import Countdown from "@components/countdown/Countdown";
import LoggedOutHome from "@components/loggedOutHome/LoggedOutHome";
import { useAppSelector } from "src/store/store";
import { useRouter } from "next/router";

function Home() {
  const userIsLogged = useAppSelector((state) => state.userReducer.isLogged);
  const router = useRouter();

  if (userIsLogged) {
    router.push("/quiz/lobby");
  }

  return (
    <div className="home">
      <div className="flex justify-center mt-10">
        <LoggedOutHome />
      </div>
    </div>
  );
}

export default Home;
