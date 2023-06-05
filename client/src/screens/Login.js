import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const Login = () => {
  const toast = useToast();
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const emailChangeHandler = (e) => {
    setEnteredEmail(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setEnteredPassword(e.target.value);
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    const userData = {
      email: enteredEmail,
      password: enteredPassword,
    };

    const { email, password } = userData;

    setIsLoading(true);
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    setIsLoading(false);
    if (response.status !== 200) {
      toast({
        description: data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        description: "Loged In sucessfull",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      history.push("/");
      window.location.reload(false);
    }
  };

  return (
    <Stack
      minH={"100vh"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack align={"center"} mb="10">
        <Heading fontSize={"4xl"} color="red.400" textAlign={"center"}>
          Sign in to your account
        </Heading>
        <Text fontSize={"lg"} color={"gray.600"}>
          to enjoy all of our cool features ✌️
        </Text>
      </Stack>
      <Stack
        direction={{ base: "column", md: "row" }}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Flex
          bg={useColorModeValue("white", "gray.700")}
          w={{ base: "90%", md: "40%" }}
          py="6"
          align={"center"}
          justify={"center"}
          boxShadow="lg"
          borderRadius={"md"}
        >
          <Stack p="5" spacing={5} w={"full"} maxW={"md"}>
            <Heading fontSize={"2xl"} textAlign={"center"}>
              Sign In
            </Heading>

            <form onSubmit={formSubmitHandler}>
              <FormControl isRequired>
                <Stack spacing="6">
                  <Box>
                    <FormLabel id="email">Email address</FormLabel>
                    <Input
                      type="email"
                      id="email"
                      value={enteredEmail}
                      onChange={emailChangeHandler}
                      placeholder="example@mail.com"
                    />
                  </Box>

                  <Box>
                    <FormLabel id="password">Password</FormLabel>
                    <Input
                      type="text"
                      id="password"
                      value={enteredPassword}
                      onChange={passwordChangeHandler}
                      placeholder=" Your Password"
                    />
                  </Box>

                  <Button
                    type="submit"
                    colorScheme={"twitter"}
                    variant={"solid"}
                    py={6}
                  >
                    {isLoading ? <Spinner /> : "Sign in"}
                  </Button>
                </Stack>
              </FormControl>
            </form>

            <Stack pt={2}>
              <Text align={"center"}>
                Don't have an account?
                <Link
                  to="/signup"
                  style={{ color: "skyblue", marginLeft: "10px" }}
                >
                  Signup
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Flex>
      </Stack>
    </Stack>
  );
};

export default Login;
