import { FORWARDED_TYPE, INCOMPLETE_TYPE, SCHEDULED_TYPE } from "./constants";

/** The task types that are actionable by this plugin. */
type TaskType = typeof FORWARDED_TYPE | typeof SCHEDULED_TYPE | typeof INCOMPLETE_TYPE;

/** The necessary details of a task. */
export type Task = {
  type: TaskType;
  text: string;
};
