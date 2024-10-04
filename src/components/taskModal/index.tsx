import { Modal } from "../modal";
import { ITask, TaskFormData } from "../../ts-interfaces/tasks";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import Checkbox from "../checkbox";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../button";

type Props = {
  title: string;
  open: boolean;
  closeModal: () => void;
  task?: ITask;
  onConfirm: (formData: TaskFormData) => void;
};

const TaskModal: React.FC<Props> = (props) => {
  const { title, open, closeModal, task, onConfirm } = props;
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<TaskFormData>({
    defaultValues: {
      title: task?.title || "",
      content: task?.content || "",
      done: task?.done || false,
      deadline: task?.deadline ? new Date(task?.deadline) : null,
    },
  });
  console.log("errors", errors);

  return (
    <Modal.Frame open={open} onClose={closeModal}>
      <Modal.Head>{title}</Modal.Head>
      <Modal.Body>
        <form
          className="flex flex-col space-y-2 font-medium text-black"
          onSubmit={handleSubmit(onConfirm)}
        >
          <Controller
            control={control}
            name="title"
            rules={{ required: true }}
            render={({ field }) => (
              <input
                {...field}
                onChange={field.onChange}
                placeholder="Title"
                defaultValue={field.value || ""}
              />
            )}
          />
          <Controller
            control={control}
            name="content"
            rules={{ required: true }}
            render={({ field }) => (
              <input
                {...field}
                onChange={field.onChange}
                placeholder="Content"
                defaultValue={field.value || ""}
              />
            )}
          />
          <Controller
            control={control}
            name="deadline"
            render={({ field }) => (
              <DatePicker
                onChange={field.onChange}
                selected={field.value}
                showTimeSelect
                dateFormat="Pp"
                className="border-0"
              />
            )}
          />
          <Controller
            control={control}
            name="done"
            render={({ field }) => (
              <Checkbox
                {...field}
                onChange={field.onChange}
                label="Done"
                checked={field.value}
                disbabled={!task}
              />
            )}
          />

          <div className="flex w-full items-center justify-between space-x-4">
            <Button
              text="Cancel"
              onClick={() => closeModal()}
              style={{
                container: "w-auto",
                text: "text-white text-xs font-medium",
              }}
            />
            <Button
              text="Confirm"
              submit
              disabled={!isValid}
              style={{
                container: "w-auto",
                text: "text-white text-xs font-medium",
              }}
            />
          </div>
        </form>
      </Modal.Body>
    </Modal.Frame>
  );
};
export default TaskModal;
