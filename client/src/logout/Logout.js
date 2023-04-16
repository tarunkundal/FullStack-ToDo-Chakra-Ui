import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  CloseButton,
  Flex,
  Heading,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import Modal from "../ui/Modal";
import { useStore } from "../store/authStore/AuthContextProvider";

const Logout = (props) => {
  const { user } = useStore();
  const history = useHistory();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const logoutHandler = async () => {
    setIsLoading(true);
    const response = await fetch("/api/users/signout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        credentials: "include",
      },
    });
    setIsLoading(false);

    const data = await response.json();

    if (response.status !== 200) {
      alert("Failed to Logout!");
    } else {
      toast({
        description: data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      props.onClose();
      history.push("/");
      window.location.reload(false);
    }
  };

  return (
    <Modal onClose={props.onClose}>
      <Stack
        p="4"
        w="20rem"
        spacing="6"
        rounded="lg"
        direction={"column"}
        mx="auto"
        mb="50"
        boxShadow="lg"
        bg={useColorModeValue("gray.50", "gray.700")}
      >
        <Flex align="center" justifyContent="space-between">
          <Heading fontSize="1.2rem">{user.name}</Heading>
          <CloseButton
            _hover={{ bgColor: "secondary", color: "white" }}
            onClick={props.onClose}
          />
        </Flex>

        <Text color="secondary" fontWeight="medium" mb="2">
          Are you sure. You want to log out !
        </Text>

        <Stack direction="row">
          <Button w="50%" onClick={props.onClose}>
            Close
          </Button>
          <Button w="50%" variant="secondary" onClick={logoutHandler}>
            {isLoading ? <Spinner /> : "Logout"}
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
};

export default Logout;
