/** A task that should be forwarded. */
export const FORWARDED_TYPE = ">";

/** A task that is scheduled for the future. */
export const SCHEDULED_TYPE = "<";

/** A task that is incomplete. */
export const INCOMPLETE_TYPE = " ";

/** The types of tasks that are actionable by the plugin. */
export const ACTIONABLE_TASK_TYPES = [FORWARDED_TYPE, SCHEDULED_TYPE];
