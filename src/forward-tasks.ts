import { App } from "obsidian";
import { applyTasks } from "./apply-tasks";
import { INCOMPLETE_TYPE, ACTIONABLE_TASK_TYPES } from "./constants";
import { fetchDailyNotes } from "./files";
import { importTasks } from "./import-tasks";
import { displayWarning } from "./notifications";

/**
 * Forward tasks from the previous daily notes to the current daily note.
 * @param editor The Obsidian editor to use.
 */
export async function forwardTasks(app: App): Promise<void> {
  // Fetch the daily notes
  const [today, yesterday] = fetchDailyNotes(app);

  // Ensure the notes are present
  if (today === undefined || yesterday === undefined) {
    displayWarning("Could not find at least two daily notes to forward tasks.");
    return;
  }

  // Remove any scheduled tasks from the previous notes
  const tasks = await importTasks(app, yesterday);

  // Filter out the incomplete tasks
  const incompleteTasks = tasks.filter((task) => task.type === INCOMPLETE_TYPE);
  const actionableTasks = tasks.filter((task) => ACTIONABLE_TASK_TYPES.includes(task.type));

  // If there are any incomplete tasks, display a warning and stop importing.
  if (incompleteTasks.length > 0) {
    displayWarning(
      "Some tasks from the previous daily note are incomplete! Please complete them before forwarding.",
    );
    return;
  }

  // Apply the tasks into the current daily note
  await applyTasks(app, today, actionableTasks);
}
