import React, { useMemo } from "react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Flex,
  List,
  ListItem,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import TaskForm from "./TaskForm";
import Modal from "../../ui/Modal";
import { useTaskStore } from "../../store/tasks/TaskProvider";
import { useState } from "react";
import axios from "axios";

const TaskItem = ({ task }) => {
  const toast = useToast();
  const { removeTask, updateStatus } = useTaskStore();
  const [isUpdate, setIsUpdate] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const DueDate = new Date(task.duedate).toDateString();

  // remove task
  const removeTaskHandler = async (id) => {
    try {
      removeTask(id);
      setIsLoading(true);
      const res = await axios.delete(`/api/todos/delete-todo/${id}`);
      setIsLoading(false);

      if (res.status === 200 && res.data === "Deleted Todo Sucessfully!") {
        toast({
          description: res.data,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // update task
  const updateTaskHandler = (id) => {
    setIsUpdate(true);
    setSelectedId(id);
  };

  // update tsk status
  const checkTaskHandler = async (id, completed) => {
    try {
      updateStatus(id, completed);
      const data = { completed };
      await axios.patch(`/api/todos/update/status/${id}`, data);

      toast({
        description: "Task Status Updated.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const closeUpdateForm = () => {
    setIsUpdate(false);
  };

  // handle checkbox state
  const handleCheckbox = (e, id) => {
    const isCompleted = e.target.checked;
    checkTaskHandler(id, isCompleted);
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {isUpdate && (
            <Modal>
              <TaskForm
                isUpdate={isUpdate}
                onClose={closeUpdateForm}
                selectedTaskId={selectedId}
              />
            </Modal>
          )}

          <List m="2" key={task.id}>
            <ListItem
              boxShadow={"xl"}
              bg={useColorModeValue("gray.50", "gray.700")}
              fontSize="14px"
              rounded="xl"
            >
              <Stack direction="cloumn" p="2" align={"center"}>
                <Stack w="10%">
                  <input
                    type="checkbox"
                    defaultChecked={task.completed ? true : false}
                    onChange={(e) => handleCheckbox(e, task.id)}
                    style={{ cursor: "pointer" }}
                  />
                </Stack>

                <Stack w="80%">
                  <Flex
                    fontWeight={"bold"}
                    textDecoration={task.completed && "line-through"}
                    pl="2"
                  >
                    {"Task:"}
                    <Text pl="3px" fontWeight={"normal"}>
                      {task.title}
                    </Text>
                  </Flex>

                  <Flex fontWeight={"bold"} pl="2">
                    Description {" :"}
                    <Text pl="3px" fontWeight={"normal"}>
                      {task.description}
                    </Text>
                  </Flex>

                  <Flex fontWeight={"bold"} pl="2">
                    Due Date {" :"}
                    <Text fontWeight={"normal"} pl="3px">
                      {DueDate}
                    </Text>
                  </Flex>
                </Stack>

                <Stack w="10%" pointerEvents={task.completed && "none"}>
                  <EditIcon
                    color="blue.300"
                    fontSize={"1.5rem"}
                    _hover={{ color: "blue.500", cursor: "pointer" }}
                    onClick={() => updateTaskHandler(task.id)}
                  />

                  <DeleteIcon
                    color="red"
                    fontSize={"1.5rem"}
                    _hover={{ color: "red.500", cursor: "pointer" }}
                    onClick={() => removeTaskHandler(task.id)}
                  />
                </Stack>
              </Stack>
            </ListItem>
          </List>
        </>
      )}
    </>
  );
};

export default React.memo(TaskItem);
