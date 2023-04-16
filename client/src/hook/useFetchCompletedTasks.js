/**
 * UseFetchCompletedTasks is used to fetch the tasks which are completed
 */
import { useTaskStore } from "../store/tasks/TaskProvider";

const useFetchCompletedTasks = () => {
  const { tasks } = useTaskStore();

  const completedTasks = tasks.filter((task) => task.completed === true);
  return { completedTasks };
};

export default useFetchCompletedTasks;
