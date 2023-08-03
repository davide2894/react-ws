import LoggedOutHome from "@components/loggedOutHome/LoggedOutHome";
import { useAppSelector } from "src/customHooks/useAppSelector";
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
