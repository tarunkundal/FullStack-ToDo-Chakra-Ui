import {
  Center,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import TaskItem from "./TaskItem";
import Taskbg from "../../assets/taskbg.jpg";
import useFetchOverdueTasks from "../../hook/useFetchOverdueTasks";

const DueTasks = () => {
  const { OverDueTasks } = useFetchOverdueTasks();

  return (
    <Stack
      py="2"
      bg={useColorModeValue("white", "gray.600")}
      px="1"
      rounded="md"
      boxShadow="xl"
    >
      <Heading textAlign="center" color="red.400">
        Over Due Tasks
      </Heading>
      {OverDueTasks.length ? (
        <>
          {OverDueTasks.map((task) => {
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

export default DueTasks;
