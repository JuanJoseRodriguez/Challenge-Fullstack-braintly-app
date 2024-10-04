import axios from "axios";
import { ITask } from "../../ts-interfaces/tasks";

type GetTasksParams = {
  order_by?: string;
  filterByState?: boolean;
};

export const getTasks = async (props: GetTasksParams): Promise<ITask[]> => {
  const { order_by, filterByState } = props;
  const filter_by = filterByState ? { done: filterByState } : undefined;
  return axios
    .get(`tasks`, {
      params: {
        order_by,
        filter_by,
      },
    })
    .then((res) => res.data);
};

type CreateTasksParams = {
  title: string;
  content: string;
  deadline?: string;
};

export const createTask = async (
  dataToCreate: CreateTasksParams
): Promise<ITask> => {
  return axios.post(`tasks`, dataToCreate).then((res) => res.data);
};

type UpdateTasksParams = {
  taskId: string;
  dataToUpdate: dataToUpdate;
};

type dataToUpdate = {
  title: string;
  content: string;
  done: boolean;
  deadline?: string;
};

export const updateTask = async (props: UpdateTasksParams): Promise<ITask> => {
  const { taskId, dataToUpdate } = props;
  return axios.patch(`tasks/${taskId}`, dataToUpdate).then((res) => res.data);
};

export const deleteTask = async (taskId: string): Promise<ITask> => {
  return axios.delete(`tasks/${taskId}`).then((res) => res.data);
};
