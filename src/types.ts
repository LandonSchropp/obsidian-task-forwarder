import { TASK_TYPES } from "./constants";

/** The task types that are actionable by this plugin. */
export type TaskType = (typeof TASK_TYPES)[number];

/** The necessary details of a task. */
export type Task = {
  type: TaskType;
  text: string;
};
