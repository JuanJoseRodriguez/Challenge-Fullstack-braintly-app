export interface ITask {
  _id: string;
  title: string;
  content: string;
  done: boolean;
  deadline: string;
  date: string;
}

export type TaskFormData = {
  title: string;
  content: string;
  done: boolean;
  deadline?: Date | null;
};
