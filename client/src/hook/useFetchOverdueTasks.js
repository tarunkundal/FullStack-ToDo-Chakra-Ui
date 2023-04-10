import useFetchActiveTasks from "./useFetchActiveTasks";

const useFetchOverdueTasks = () => {
  const { activeTasks } = useFetchActiveTasks();

  const currentDate = new Date().toDateString();
  const d1 = Date.parse(currentDate);

  const OverDueTasks = activeTasks.filter(
    (task) => Date.parse(task.duedate) < d1
  );

  return { OverDueTasks };
};

export default useFetchOverdueTasks;
