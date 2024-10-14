import { App, TFile } from "obsidian";
import { Task } from "./types";
import { parseTask } from "./parse-task";

/**
 * A simple type guard for filtering tasks.
 */
function isTask(task: Task | undefined): task is Task {
  return task !== undefined;
}

/**
 * This method _destructively_ imports the task from the provided note. Currently, the only tasks
 * that are deleted are scheduled tasks, but that could change in the future.
 *
 * @param file The note to import the tasks from.
 * @returns The tasks that were imported from the note. Only tasks that are actionable by the plugin
 * are returned. The order of the tasks is preserved.
 */
export async function importTasks(app: App, file: TFile): Promise<Task[]> {
  const lines = (await app.vault.read(file)).split("\n");
  return lines.map(parseTask).filter(isTask);
}
