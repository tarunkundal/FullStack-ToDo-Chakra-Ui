import { useContext, useReducer } from "react";
import taskContext from "./task-context";

const initialState = {
  tasks: [],
};

const taskReaducer = (state, action) => {
  // set tasks
  if (action.type === "SET_TASKS") {
    return {
      ...state,
      tasks: action.tasks,
    };
  }

  // add task
  if (action.type === "ADD_TASK") {
    return {
      ...state,
      tasks: [...state.tasks, action.task],
    };
  }

  // delete task
  if (action.type === "REMOVE_TASK") {
    const filteredTasks = state.tasks.filter((task) => task.id !== action.id);

    return {
      ...state,
      tasks: filteredTasks,
    };
  }

  // update task
  if (action.type === "UPDATE_TASK") {
    const taskToBeUpdated = state.tasks.find((task) => task.id === action.id);

    taskToBeUpdated.title = action.updatedData.title;
    taskToBeUpdated.description = action.updatedData.description;
    taskToBeUpdated.duedate = action.updatedData.duedate;
    taskToBeUpdated.updated_at = action.updatedData.updated_at;

    return {
      ...state,
    };
  }

  // update task status
  if (action.type === "UPDATE_STATUS") {
    const taskStatusToBeUpdated = state.tasks.find(
      (task) => task.id === action.id
    );

    taskStatusToBeUpdated.completed = action.status;
    return {
      ...state,
    };
  }

  return state;
};

const TaskProvider = (props) => {
  const [taskState, dispatchTaskAction] = useReducer(
    taskReaducer,
    initialState
  );

  const setTaskHandler = (tasks) => {
    dispatchTaskAction({ type: "SET_TASKS", tasks: tasks });
  };

  const removeTaskHandler = (id) => {
    dispatchTaskAction({ type: "REMOVE_TASK", id: id });
  };

  const addTaskHandler = (task) => {
    dispatchTaskAction({ type: "ADD_TASK", task: task });
  };

  const updateTaskHandler = (id, updatedData) => {
    dispatchTaskAction({
      type: "UPDATE_TASK",
      id: id,
      updatedData: updatedData,
    });
  };

  const updateTaskStatusHandler = (id, status) => {
    dispatchTaskAction({ type: "UPDATE_STATUS", status: status, id: id });
  };

  const contextValue = {
    tasks: taskState.tasks,
    setTasks: setTaskHandler,
    removeTask: removeTaskHandler,
    addTask: addTaskHandler,
    updateTask: updateTaskHandler,
    updateStatus: updateTaskStatusHandler,
  };

  return (
    <taskContext.Provider value={contextValue}>
      {props.children}
    </taskContext.Provider>
  );
};

export default TaskProvider;

export const useTaskStore = () => {
  const context = useContext(taskContext);
  if (context === undefined) {
    throw new Error("usetaskstore must be used inside of TaskProvider");
  }
  return context;
};
