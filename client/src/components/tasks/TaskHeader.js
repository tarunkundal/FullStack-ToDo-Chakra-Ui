import { Button, Heading, Stack, Text } from "@chakra-ui/react";
import { useStore } from "../../store/authStore/AuthContextProvider";

const TaskHeader = (props) => {
  const { user } = useStore();

  return (
    <Stack
      justifyContent={"space-around"}
      p="4"
      direction="row"
      borderBottom="1px"
      align="center"
    >
      <Stack direction={{ base: "column", md: "row" }}>
        <Heading fontSize="1.3rem">Welcome back,</Heading>
        <Text color="red.400" fontWeight="medium" fontSize={"1.5rem"}>
          {user.name}
        </Text>
      </Stack>

      <Button
        w="30%"
        paddingY={{ base: "4", md: "6" }}
        colorScheme="twitter"
        onClick={props.showTaskForm}
        fontSize={{ base: "1rem", md: "1.3rem" }}
        outlineColor="blue.400"
      >
        Create Task
      </Button>
    </Stack>
  );
};

export default TaskHeader;
