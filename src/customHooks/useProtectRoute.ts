import { useAppSelector } from "@store";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function useProtectRoute() {
  const user = useAppSelector((state) => state.userReducer);
  const router = useRouter();
  useEffect(() => {
    if (!user.isLogged) {
      router.push("/");
    }
  }, [router, user.isLogged]);
}
