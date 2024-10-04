import { useMutation } from "@tanstack/react-query";
import { createTask, deleteTask, updateTask } from "../../api/tasks/tasks";

interface IUseMutationTaskReq {
  successCallback: () => void;
}
export function useCreateTask({ successCallback }: IUseMutationTaskReq) {
  return useMutation({
    mutationKey: ["createTask"],
    mutationFn: createTask,
    onSuccess: () => {
      successCallback();
    },
    onError: (error) => console.log(error),
  });
}

export function useUpdateTask({ successCallback }: IUseMutationTaskReq) {
  return useMutation({
    mutationKey: ["updateTask"],
    mutationFn: updateTask,
    onSuccess: () => {
      successCallback();
    },
    onError: (error) => console.log(error),
  });
}

export function useDeleteTask({ successCallback }: IUseMutationTaskReq) {
  return useMutation({
    mutationKey: ["deleteTask"],
    mutationFn: deleteTask,
    onSuccess: () => {
      successCallback();
    },
    onError: (error) => console.log(error),
  });
}
