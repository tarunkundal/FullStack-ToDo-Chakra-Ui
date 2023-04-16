import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spinner,
  Stack,
  Tooltip,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import Modal from "../../ui/Modal";
import { useState } from "react";
import { useTaskStore } from "../../store/tasks/TaskProvider";
import { useStore } from "../../store/authStore/AuthContextProvider";
import axios from "axios";

const TaskForm = (props) => {
  const toast = useToast();
  const { user } = useStore();
  const { addTask, updateTask, tasks } = useTaskStore();

  // for task to be updated
  const isUpdate = props.isUpdate;
  const selectedTaskId = props.selectedTaskId;
  const taskToBeUpdated = tasks.find((tsk) => tsk.id === selectedTaskId);

  const [enteredTask, setEnteredTask] = useState(
    isUpdate ? taskToBeUpdated.title : ""
  );
  const [enteredDescription, setEnteredDescription] = useState(
    isUpdate ? taskToBeUpdated.description : ""
  );
  const [duedate, setDuedate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // new task
  const submitTaskHandler = async (e) => {
    e.preventDefault();
    try {
      const data = {
        title: enteredTask,
        user_email: user.email,
        created_at: new Date(),
        duedate: duedate,
        completed: false,
        description: enteredDescription,
      };

      if (!enteredTask || !duedate) {
        return alert("Please enter both fields!");
      }

      addTask(data);
      setIsLoading(true);
      const res = await axios.post(`/api/todos/new-todo`, data);
      setIsLoading(false);
      props.onClose();

      if ((res.status = 201)) {
        toast({
          title: "Task created.",
          description: res.data,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        alert("Something went wrong!");
      }

      setEnteredTask("");
      setDuedate("");
    } catch (error) {
      console.log(error);
    }
  };

  // update
  const updateTaskHandler = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        title: enteredTask,
        updated_at: new Date(),
        duedate: duedate,
        description: enteredDescription,
      };

      if (!updatedData.title || !updatedData.duedate)
        return alert("Please update both fields!");

      updateTask(selectedTaskId, updatedData);
      setIsLoading(true);
      const res = await axios.put(
        `/api/todos/update/${selectedTaskId}`,
        updatedData
      );
      setIsLoading(false);
      if (res.status === 202) {
        props.onClose();
        toast({
          description: res.data,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          description: res.data,
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal onClose={props.onClose}>
      <Stack
        bgColor={useColorModeValue("white", "gray.600")}
        borderRadius={"lg"}
        boxShadow={"xl"}
        spacing={{ base: "2", md: "4" }}
        p="5"
      >
        <Heading
          textAlign={"center"}
          color="primary"
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight={"medium"}
          paddingBottom={2}
        >
          {isUpdate ? "Update Task" : "Create Task"}
        </Heading>

        <form onSubmit={isUpdate ? updateTaskHandler : submitTaskHandler}>
          <FormControl id="Task" isRequired>
            <FormLabel>Task Title</FormLabel>
            <Tooltip label="Enter your task title">
              <Input
                type="text"
                fontWeight={"medium"}
                placeholder="Enter Task"
                value={enteredTask}
                onChange={(e) => setEnteredTask(e.target.value)}
              />
            </Tooltip>
          </FormControl>

          <FormControl id="Task_Description">
            <FormLabel>Task Description</FormLabel>
            <Tooltip label="Enter your task description">
              <Input
                type="text"
                fontWeight={"medium"}
                placeholder="Enter Task Descripition"
                value={enteredDescription}
                onChange={(e) => setEnteredDescription(e.target.value)}
              />
            </Tooltip>
          </FormControl>

          <FormControl id="Due_Date">
            <FormLabel>Due Date</FormLabel>
            <Tooltip label="Select due date for your task">
              <Input
                type="date"
                id="date"
                placeholder="Due Date"
                value={duedate}
                onChange={(e) => setDuedate(e.target.value)}
                cursor="pointer"
                fontWeight={"medium"}
              />
            </Tooltip>
          </FormControl>

          <Stack direction={"row"} pt={4}>
            <Button w="50%" onClick={props.onClose} colorScheme="red">
              {isUpdate ? "Cancle Update" : "Cancle"}
            </Button>
            <Button w="50%" colorScheme="twitter" type="submit">
              {isLoading ? (
                <Spinner />
              ) : (
                <> {isUpdate ? "Update" : "Add Task"}</>
              )}
            </Button>
          </Stack>
        </form>
      </Stack>
    </Modal>
  );
};

export default TaskForm;
