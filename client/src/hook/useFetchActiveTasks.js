import { useTaskStore } from "../store/tasks/TaskProvider";

const useFetchActiveTasks = () => {
  const { tasks } = useTaskStore();

  const activeTasks = tasks.filter((task) => task.completed === false);

  return { activeTasks };
};

export default useFetchActiveTasks;
