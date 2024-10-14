import { App, TFile } from "obsidian";
import { readTasks } from "./read-tasks";
import { Task } from "./types";

/** A regular expression for an individual task. */
export const TASK_REGEX = /^\s*[-*] \[(.)\] (.*)$/;

/**
 * This method _destructively_ imports the task from the provided note. Currently, the only tasks
 * that are deleted are scheduled tasks, but that could change in the future.
 *
 * @param app The Obsidian application instance.
 * @param file The note to import the tasks from.
 * @returns The tasks that were imported from the note. Only tasks that are actionable by the plugin
 * are returned. The order of the tasks is preserved.
 */
export async function importTasks(app: App, file: TFile): Promise<Task[]> {
  // TODO: Remove scheduled tasks.
  return await readTasks(app, file);
}
