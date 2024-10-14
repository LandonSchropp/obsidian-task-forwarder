/** A task that should be forwarded. */
export const FORWARDED_TYPE = ">";

/** A task that is scheduled for the future. */
export const SCHEDULED_TYPE = "<";

/** A task that is incomplete. */
export const INCOMPLETE_TYPE = " ";

/** The types of tasks that are actionable by the plugin. */
export const ACTIONABLE_TASK_TYPES = [FORWARDED_TYPE, SCHEDULED_TYPE];

/** The regular expression used to determine the tasks section. */
export const TASKS_HEADING_REGEX = /tasks/i;

/** A regular expression for an individual task. */
export const TASK_REGEX = /^\s*[-*] \[(.)\] (.*)$/;
