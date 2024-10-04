import { useState } from "react";
import { ITask, TaskFormData } from "../../ts-interfaces/tasks";
import TaskModal from "../taskModal";
import { format } from "date-fns";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { useCreateTask, useDeleteTask, useUpdateTask } from "./queries";
import { useQueryClient } from "@tanstack/react-query";
import Button from "../button";

interface ITaskListProps {
  tasks: ITask[];
  loading: boolean;
  handleOrder: (field: string) => void;
}
const TaskList = (props: ITaskListProps) => {
  const { loading, tasks, handleOrder } = props;
  const queryClient = useQueryClient();
  const [showTaskModal, setShowTaskModal] = useState<{
    open: boolean;
    task?: ITask;
  }>({ open: false });
  console.log("loading", loading);
  const invalidateTasks = () =>
    queryClient.invalidateQueries({ queryKey: ["getTasks"] });

  const handleModalClose = () => {
    setShowTaskModal({ open: false });
  };

  const successCallback = () => {
    invalidateTasks();
    handleModalClose();
  };

  const { mutate: createTask } = useCreateTask({
    successCallback,
  });

  const handleCreateTask = (task: TaskFormData) => {
    const dataToSend = {
      title: task.title,
      content: task.content,
      deadline: task.deadline
        ? format(task.deadline, "yyyy-MM-dd HH:mm")
        : undefined,
    };
    createTask(dataToSend);
  };

  const { mutate: deleteTask } = useDeleteTask({
    successCallback,
  });

  const { mutate: updateTask } = useUpdateTask({
    successCallback,
  });

  const handleUpdateTask = (task: TaskFormData) => {
    const dataToSend = {
      taskId: showTaskModal.task!._id,
      dataToUpdate: {
        title: task.title,
        content: task.content,
        done: task.done,
        deadline: task.deadline
          ? format(task.deadline, "yyyy-MM-dd HH:mm")
          : undefined,
      },
    };
    updateTask(dataToSend);
  };

  return (
    <>
      {showTaskModal.open && (
        <TaskModal
          title="Edit Task"
          open={showTaskModal.open}
          closeModal={handleModalClose}
          onConfirm={showTaskModal.task ? handleUpdateTask : handleCreateTask}
          task={showTaskModal.task}
        />
      )}
      <div className="mx-7 mb-6 rounded-xl bg-dark-card_I px-4 py-5">
        <div className="flex items-center justify-between border-b border-dark-card_I px-4 pb-3">
          <h1 className="font-medium">Task List</h1>
          <Button
            text="New Task"
            onClick={() => setShowTaskModal({ open: true })}
            style={{ container: "w-auto", text: "text-xs font-medium" }}
          />
        </div>

        <table className="min-w-full table-fixed divide-y divide-grey-light_I text-left">
          <thead className="flex">
            <tr className="flex h-14 w-full items-center px-4 text-xs text-blue_light">
              <th
                className="flex-1 font-medium"
                onClick={() => handleOrder("title")}
              >
                Title
              </th>
              <th
                className="flex-1 font-medium"
                onClick={() => handleOrder("content")}
              >
                Content
              </th>
              <th
                className="flex-1 font-medium"
                onClick={() => handleOrder("deadline")}
              >
                Deadline
              </th>
              <th
                className="flex-1 font-medium"
                onClick={() => handleOrder("done")}
              >
                Done
              </th>
              <th className="flex-1 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-grey-light_I overflow-y-auto">
            {tasks &&
              tasks.map((task: ITask, index: number) => {
                return (
                  <tr
                    key={`${index}-${task._id}`}
                    className="flex min-h-14 w-full items-center px-4 text-xxsm text-grey-medium_I"
                  >
                    <td className="flex-1 font-medium">{task.title}</td>
                    <td className="flex-1 font-medium">{task.content}</td>
                    <td className="flex-1 font-medium">
                      {task.deadline
                        ? format(task.deadline, "yyyy-MM-dd HH:mm")
                        : "-"}
                    </td>
                    <td className="flex-1 font-medium">
                      {task.done ? "true" : "false"}
                    </td>
                    <td className="flex-1 flex space-x-2">
                      <div
                        className="h-4 w-4"
                        onClick={() => deleteTask(task._id)}
                      >
                        <TrashIcon />
                      </div>
                      <div
                        className="h-4 w-4"
                        onClick={() => setShowTaskModal({ open: true, task })}
                      >
                        <PencilSquareIcon />
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TaskList;
