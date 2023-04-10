import { useEffect } from "react";
import axios from "axios";
import { useTaskStore } from "../store/tasks/TaskProvider";

const useFetch = (url) => {
  const { setTasks } = useTaskStore();

  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        const res = await axios.get(url);

        setTasks(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllTasks();
  }, [url]);
};

export default useFetch;
