import { App } from "obsidian";
import { fetchDailyNotes } from "../files";
import { displayNotification } from "../notifications";
import { applyTasks, importTasks } from "../tasks";

/**
 * Forward tasks from the previous daily notes to the current daily note.
 * @param editor The Obsidian editor to use.
 */
export function forwardTasks(app: App): void {
  // Fetch the daily notes.
  const [today, yesterday] = fetchDailyNotes(app);

  if (today === undefined || yesterday === undefined) {
    displayNotification("Could not find at least two daily notes to forward tasks.");
  }

  // Remove any scheduled tasks from the previous notes
  const tasks = importTasks(yesterday!);

  // Apply the tasks into the current daily note.
  applyTasks(today!, tasks);
}
