import { useState } from "react";
import { useGetTasks } from "./queries";
import { ISort } from "../ts-interfaces/others";
import TaskList from "../components/taskList";

const TasksPage = () => {
  const [sortBy, setSortBy] = useState<ISort>({
    id: "deadline",
    desc: true,
  });

  const { data: queryTasks, isLoading: isLoadingTasks } = useGetTasks({
    sortBy: `${sortBy?.desc ? "-" : ""}${sortBy?.id}`,
  });

  const handleOrder = (field: string) => {
    setSortBy({
      id: field,
      desc: field === sortBy.id ? !sortBy.desc : true,
    });
  };

  return (
    <div className="w-full px-7">
      <div className="my-5">
        <div className="flex justify-between">
          <div>Braintly</div>
        </div>
      </div>

      <div>
        <TaskList
          tasks={queryTasks || []}
          loading={isLoadingTasks}
          handleOrder={handleOrder}
        />
      </div>
    </div>
  );
};

export default TasksPage;
