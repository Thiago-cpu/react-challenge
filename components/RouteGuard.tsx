import { FC, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import useLocalStorage from "../hooks/useLocalStorage";

type Props = {
  children: ReactNode;
};

const RouteGuard: FC<Props> = ({ children }) => {
  const router = useRouter();
  const [jwt] = useLocalStorage("jwt", "");
  const [authorized, setAuthorized] = useState(false);

  const hideContent = () => setAuthorized(false);

  useEffect(() => {
    authCheck(router.asPath);

    router.events.on("routeChangeStart", hideContent);

    router.events.on("routeChangeComplete", authCheck);

    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };

    // eslint-disable-next-line
  }, [jwt]);

  const authCheck = async (url: string) => {
    try {
      const path = url.split("?")[0];
      if (path === "/login") return setAuthorized(true);
      const res = await fetch(`/api/isAuth?jwt=${jwt}`);
      const { isAuth } = await res.json();
      setAuthorized(!!isAuth);
      if (!isAuth) {
        router.push({
          pathname: "/login",
        });
      }
    } catch {
      setAuthorized(false);
    }
  };

  return authorized ? <div>{children}</div> : null;
};

export default RouteGuard;
