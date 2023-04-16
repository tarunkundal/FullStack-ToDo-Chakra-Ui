import React, { useCallback } from "react";
import useFetchActiveTasks from "../../hook/useFetchActiveTasks";
import TaskItem from "./TaskItem";
import {
  Center,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Taskbg from "../../assets/taskbg.jpg";

const Tasks = () => {
  const { activeTasks } = useFetchActiveTasks();

  return (
    <Stack
      py="2"
      bg={useColorModeValue("white", "gray.600")}
      px="1"
      rounded="md"
      boxShadow="xl"
    >
      <Heading color="blue.400" textAlign="center">
        Active Tasks
      </Heading>

      {activeTasks.length ? (
        <>
          {activeTasks.map(
            useCallback(
              (task) => {
                return <TaskItem task={task} key={task.id} />;
              },
              [activeTasks]
            )
          )}
        </>
      ) : (
        <Center>
          <Stack>
            <Image src={Taskbg} />
            <Text>No Task in this filter at the moment! </Text>
          </Stack>
        </Center>
      )}
    </Stack>
  );
};

export default React.memo(Tasks);
