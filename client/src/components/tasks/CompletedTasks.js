import {
  Center,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import useFetchCompletedTasks from "../../hook/useFetchCompletedTasks";
import TaskItem from "./TaskItem";
import Taskbg from "../../assets/taskbg.jpg";

const CompletedTasks = () => {
  const { completedTasks } = useFetchCompletedTasks();

  return (
    <Stack
      py="2"
      bg={useColorModeValue("white", "gray.600")}
      px="1"
      rounded="xl"
      boxShadow="xl"
    >
      <Heading color="teal.400" textAlign="center">
        Completed Tasks
      </Heading>

      {completedTasks.length ? (
        <>
          {completedTasks.map((task) => {
            return <TaskItem task={task} key={task.id} />;
          })}
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

export default CompletedTasks;
