import { useAppSelector } from "src/customHooks/useAppSelector";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function useProtectRoute(redirectTargetRoute?: string) {
  const user = useAppSelector((state) => state.userReducer);
  const router = useRouter();
  useEffect(() => {
    if (!user.isLogged) {
      if (redirectTargetRoute) {
        router.push(redirectTargetRoute);
      } else {
        router.push("/");
      }
    }
  }, [redirectTargetRoute, router, user.isLogged]);
}
