import {
  Container,
  Stack,
  Flex,
  Heading,
  Text,
  Button,
  Image,
  createIcon,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import TaskForm from "../components/tasks/TaskForm";
import Modal from "../ui/Modal";

const Home = () => {
  const [createTask, setCreateTask] = useState(false);

  const openTaskHandler = () => {
    setCreateTask(true);
  };
  const closeTaskHandler = () => {
    setCreateTask(false);
  };

  return (
    <>
      {createTask && (
        <Modal>
          <TaskForm onClose={closeTaskHandler} />
        </Modal>
      )}

      <Container maxW={"6xl"} marginBottom={10}>
        <Stack
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 10, md: 28 }}
          direction={{ base: "column", md: "row" }}
        >
          <Stack flex={1} spacing={{ base: 5, md: 10 }}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "3xl", sm: "4xl", lg: "5xl" }}
            >
              <Text as={"span"} position={"relative"}>
                Write once,
              </Text>
              <br />
              <Text as={"span"} color={"red.400"}>
                remember everywhere!
              </Text>
            </Heading>
            <Text color={"gray.500"}>
              <Text as={"span"} color={"red.500"}>
                Taskify ,
              </Text>
              offer a way to increase productivity, stopping you from forgetting
              things, helps prioritise tasks, manage tasks effectively, use time
              wisely and improve time management as well as workflow.
              <br />
              It is a task management app to help you stay organized and manage
              your day-to-day.
            </Text>
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={{ base: "column", sm: "row" }}
            >
              <Button
                rounded={"full"}
                size={"lg"}
                fontWeight={"normal"}
                px={6}
                colorScheme={"red"}
                bg={"red.400"}
                _hover={{ bg: "red.500" }}
              >
                <Link to={"/tasks"}>Get started</Link>
              </Button>
              <Button
                rounded={"full"}
                size={"lg"}
                fontWeight={"normal"}
                colorScheme="linkedin"
                px={6}
                onClick={openTaskHandler}
              >
                Create Task
              </Button>
            </Stack>
          </Stack>
          <Flex
            justify={"center"}
            align={"center"}
            position={"relative"}
            w={{ base: "full", md: "50%" }}
            height={"280px"}
            bgColor={"red.50"}
            zIndex={-1}
          >
            <Image
              borderRadius={"2xl"}
              w={"full"}
              h={{ base: "125%", md: "150%" }}
              alt="right image"
              src="https://img.freepik.com/premium-vector/list-concept-illustration_270158-301.jpg?w=740"
              position={"absolute"}
              left={0}
              mt={{ base: "10" }}
              color={useColorModeValue("red.50", "red.400")}
            />
          </Flex>
        </Stack>
      </Container>
    </>
  );
};

export default Home;
