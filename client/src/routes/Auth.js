import axios from "axios";
import React, { useEffect, useState } from "react";

import { useStore } from "../store/authStore/AuthContextProvider";
import { Center, Image, Spinner } from "@chakra-ui/react";
import logo from "../assets/logo_transparent.png";

const Auth = ({ children }) => {
  const { setUser } = useStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/api/auth", {
          withCredentials: true,
        });

        const user = res.data.user;
        if (res.status !== 401) {
          setUser(user);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (isLoading)
    return (
      <Center h="100vh" w="100vw">
        <Image src={logo} w="100px" />
        <Spinner />
      </Center>
    );
  return <>{children}</>;
};

export default Auth;
