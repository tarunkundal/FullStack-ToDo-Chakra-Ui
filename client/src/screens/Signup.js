import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Spinner,
  useToast,
} from "@chakra-ui/react";

import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link, useHistory } from "react-router-dom";

const Signup = () => {
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredCPassword, setEnteredCPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const nameChangeHandler = (e) => {
    setEnteredName(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setEnteredPassword(e.target.value);
  };

  const emailChangeHandler = (e) => {
    setEnteredEmail(e.target.value);
  };

  const cpasswordChangeHandler = (e) => {
    setEnteredCPassword(e.target.value);
  };

  const submitFormHandler = async (e) => {
    e.preventDefault();
    const userData = {
      name: enteredName,
      email: enteredEmail,
      password: enteredPassword,
      created_at: new Date().toDateString(),
    };

    const { name, email, password, created_at } = userData;

    if (enteredPassword !== enteredCPassword) {
      return window.alert("Passwords donot match, Please retry!");
    }

    setIsLoading(true);

    const response = await fetch("/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        created_at,
        name,
      }),
    });

    setIsLoading(false);

    const data = await response.json();
    console.log(data);

    if (response.status !== 201) {
      toast({
        description: data.message,
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        description: data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      history.push("/");
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={5} w={{ base: "95%" }} margin={"auto"} maxW={"lg"} py={8}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} color="red.400" textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={3}>
            <form onSubmit={submitFormHandler}>
              <Stack spacing={3}>
                <FormControl id="fullName" isRequired>
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    type="text"
                    placeholder="eg: John Maxwell"
                    id="fullName"
                    onChange={nameChangeHandler}
                    value={enteredName}
                  />
                </FormControl>

                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    value={enteredEmail}
                    onChange={emailChangeHandler}
                    id="email"
                    placeholder="example@mail.com"
                  />
                </FormControl>

                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      // type={"text"}
                      value={enteredPassword}
                      onChange={passwordChangeHandler}
                      id="password"
                      type={showPassword ? "text" : "password"}
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <FormControl id="cpassword" isRequired>
                  <FormLabel>Confirm Password</FormLabel>
                  <Input
                    type="text"
                    value={enteredCPassword}
                    onChange={cpasswordChangeHandler}
                    id="cpassword"
                  />
                </FormControl>
                <Stack spacing={10} pt={1}>
                  <Button py="6" type="submit" colorScheme="twitter">
                    {isLoading ? <Spinner /> : "Sign Up"}
                  </Button>
                </Stack>
              </Stack>
            </form>
            <Stack pt={5}>
              <Text align={"center"}>
                Already a user?
                <Link
                  to="/login"
                  style={{ color: "skyblue", marginLeft: "10px" }}
                >
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Signup;
