import { Center, Image, Stack, Text } from "@chakra-ui/react";
import TaskHeader from "./TaskHeader";
import { useStore } from "../../store/authStore/AuthContextProvider";
import { useTaskStore } from "../../store/tasks/TaskProvider";
import React, { useState } from "react";
import TaskForm from "./TaskForm";
import Modal from "../../ui/Modal";
import useFetch from "../../hook/useFetch";
import ActiveTasks from "./ActiveTasks";
import CompletedTasks from "./CompletedTasks";
import DueTasks from "./DueTasks";
import Navbar from "../navbar/Navbar";

const TaskList = () => {
  const { user } = useStore();
  const { tasks } = useTaskStore();
  const [showTodoForm, setShowTodoForm] = useState(false);

  useFetch(`/api/todos/alltodos/${user.email}`);

  const showTaskForm = () => {
    setShowTodoForm(true);
  };
  const hideTaskForm = () => {
    setShowTodoForm(false);
  };

  return (
    <>
      {showTodoForm && (
        <Modal>
          <TaskForm onClose={hideTaskForm} />
        </Modal>
      )}
      <>
        <TaskHeader showTaskForm={showTaskForm} />

        {!tasks.length ? (
          <Center w="80%" mx="auto" mt="2">
            <Stack>
              <Text textAlign="center">
                Opps! You don't have any task at the moment. Please create it!
              </Text>
              <Image
                src={
                  "https://cdn.dribbble.com/users/2066397/screenshots/5519266/empty-states.gif"
                }
                alt="image for empty tasks"
              />
            </Stack>
          </Center>
        ) : (
          <Stack
            p="2"
            spacing={2}
            direction={{ base: "column", md: "row" }}
            justifyContent="space-around"
          >
            <Stack w={{ md: "33%" }}>
              <ActiveTasks />
            </Stack>
            <Stack w={{ md: "33%" }}>
              <CompletedTasks />
            </Stack>
            <Stack w={{ md: "33%" }}>
              <DueTasks />
            </Stack>
          </Stack>
        )}
      </>
    </>
  );
};

export default React.memo(TaskList);
