import React from "react";
import { Button, Flex, Heading, Stack, Text, Tooltip } from "@chakra-ui/react";
import { useStore } from "../../store/authStore/AuthContextProvider";
import { AddIcon } from "@chakra-ui/icons";

const TaskHeader = (props) => {
  const { user } = useStore();

  const todayDate = new Date().toDateString();

  return (
    <Stack
      justifyContent={"space-around"}
      p="4"
      direction="row"
      borderBottom="1px"
      align="center"
    >
      <Flex textAlign="center" direction={{ base: "column", md: "row" }}>
        <Heading fontSize="1.3rem">Welcome back, </Heading>
        <Heading fontSize="1.3rem" color="secondary">
          {user.name}
        </Heading>
      </Flex>

      <Stack direction="row" alignItems="center">
        <Tooltip label="Create Task">
          <Button
            color="primary"
            rounded="lg"
            onClick={props.showTaskForm}
            size="sm"
            _hover={{ color: "primary2" }}
          >
            <AddIcon fontSize="lg" />
          </Button>
        </Tooltip>

        <Heading fontSize="12px" color="primary">
          <Text color="secondary"> Today :</Text> {todayDate}
        </Heading>
      </Stack>
    </Stack>
  );
};

export default TaskHeader;

/*
  <Tooltip label="Create Task">
                <Button
                  color="primary"
                  rounded={"full"}
                  size={"sm"}
                  onClick={props.showTaskForm}
                >
                  <AddIcon />
                </Button>
              </Tooltip>
*/
