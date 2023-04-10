import { createContext } from "react";

const taskContext = createContext({
  tasks: [],
  setTasks: (tasks) => {},
  removeTask: (id) => {},
  addTask: (task) => {},
  updateTask: (id, updatedData) => {},
  updateStatus: (id, status) => {},
});

export default taskContext;
