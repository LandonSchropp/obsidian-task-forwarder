import { TFile } from "obsidian";
import { Task } from "./types";

const TASKS_HEADING_REGEX = /tasks/i;

/**
 * This method _destructively_ imports the task from the provided note. Currently, the only tasks
 * that are deleted are scheduled tasks, but that could change in the future.
 *
 * If there are any incomplete tasks, it displays a warning to the user.
 *
 * @param file The note to import the tasks from.
 * @returns The tasks that were imported from the note. Only tasks that are actionable by the plugin
 * are returned. The order of the tasks is preserved.
 */
export function importTasks(file: TFile): Task[] {
  return [];
}

/**
 * This method modifies the provided note, applying the tasks to it.
 * @param file The note to apply the tasks to.
 * @param tasks The tasks to apply to the note.
 */
export function applyTasks(file: TFile, tasks: Task[]): void {}
