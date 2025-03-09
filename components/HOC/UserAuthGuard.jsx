import { useEffect, useState } from "react";

import { usePathname, useRouter } from "next/navigation";
import { inject, observer } from "mobx-react";

import HTTPKit from "../../common/helpers/HTTPKit";
import APIKit from "../../common/helpers/APIKit";
import { AUTH_TOKEN_KEY } from "@/common/helpers/KeyChain";

export const setJWTokenAndRedirect = (accessToken, redirector = () => {}) => {
  const onSuccess = (client) => {
    let token = client.defaults.headers.common["Authorization"];
    token = token.replace("Bearer ", "");
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    // TODO: Add logic for redirecting to different view
    // based on User type and Role / Access
    HTTPKit.isReady.resolve(client);
    redirector();
  };
  return APIKit.setClientToken(accessToken)
    .then(onSuccess)
    .catch((error) => console.log(error));
};

function CustomerAuthGuardHOC(props) {
  const router = useRouter();
  const pathname = usePathname();
  const [state, setState] = useState({
    isAuthenticated: false,
    hasCheckedLocalStorageToken: false,
  });

  const {
    meStore: { me },
  } = props;

  const fetchMe = () => {
    const { meStore } = props;

    const handleSuccess = ({ data }) => {
      meStore.setMe(data.user);
      meStore.fetchMe();
    };

    const handleFailure = () => {
      const nextURL = { next: pathname };
      const queryParams = new URLSearchParams(nextURL).toString();
      router.push(`/login?${queryParams}`);
    };

    return APIKit.me.getProfile().then(handleSuccess).catch(handleFailure);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem(AUTH_TOKEN_KEY);

    if (accessToken) {
      setJWTokenAndRedirect(accessToken)
        .then(fetchMe)
        .then(
          setState((prevState) => ({
            ...prevState,
            hasCheckedLocalStorageToken: true,
          }))
        )
        .catch((error) => {
          router.push("/login");
          throw error;
        });
    } else {
      const nextURL = { next: pathname };
      const queryParams = new URLSearchParams(nextURL).toString();
      router.push(`/login?${queryParams}`);
    }
  }, []);

  return state.hasCheckedLocalStorageToken && me?.phone ? props.children : null;
}

export default inject("meStore")(observer(CustomerAuthGuardHOC));
