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
 * This method reads the task items from the provided note.
 *
 * @param app The Obsidian application instance.
 * @param file The note to import the tasks from.
 * @returns The tasks that were imported from the note. The order of the tasks is preserved.
 */
export async function readTasks(app: App, file: TFile): Promise<Task[]> {
  const lines = (await app.vault.read(file)).split("\n");
  return lines.map(parseTask).filter(isTask);
}
