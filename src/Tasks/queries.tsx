import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getTasks } from "../api/tasks/tasks";

interface IUseGetTasks {
  sortBy: string;
  filterByState?: boolean;
}

export function useGetTasks({ sortBy }: IUseGetTasks) {
  return useQuery({
    queryKey: ["getTasks", sortBy],
    queryFn: () =>
      getTasks({
        order_by: sortBy,
      }),
    enabled: true,
    placeholderData: keepPreviousData,
  });
}
