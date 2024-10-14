import { App, TFile } from "obsidian";
import { Task } from "./types";
import { SCHEDULED_TYPE } from "./constants";
import { displayNotification } from "./notifications";
import { parseTasks } from "./parse-tasks";

/** The regular expression used to determine the tasks section. */
export const TASKS_HEADING_REGEX = /tasks/i;

/**
 * Converts a task to a string.
 * @param task The task to convert to a string.
 * @returns The string representation of the task.
 */
function convertTaskToString(task: Task): string {
  return `- [${task.type}] ${task.text}`;
}

/**
 * This method modifies the provided note, applying the tasks to it.
 * @param app The Obsidian application instance.
 * @param file The note to apply the tasks to.
 * @param tasks The tasks to apply to the note.
 */
export async function applyTasks(app: App, file: TFile, tasks: Task[]): Promise<void> {
  const lines = (await app.vault.read(file)).split("\n");
  const existingTasks = parseTasks(lines);

  // Find the header line
  const headerIndex = lines.findIndex((line) => TASKS_HEADING_REGEX.test(line));
  const insertIndex = headerIndex === -1 ? lines.length : Math.min(headerIndex + 2);

  console.log(tasks, existingTasks);

  // Filter out the tasks that are already contained in the note
  tasks = tasks.filter((task) => {
    return !existingTasks.some((existingTask) => existingTask.text === task.text);
  });

  // If there aren't any tasks to import, display a notice and return
  if (tasks.length === 0) {
    displayNotification("There are no tasks to forward.");
    return;
  }

  // Replace the task markers for everything but scheduled tasks
  tasks = tasks.map((task) => {
    return {
      ...task,
      type: task.type === SCHEDULED_TYPE ? SCHEDULED_TYPE : " ",
    };
  });

  // Replace the content of the file
  const replacementLines = [
    ...lines.slice(0, insertIndex),
    ...tasks.map(convertTaskToString),
    ...lines.slice(insertIndex),
  ];

  await app.vault.modify(file, replacementLines.join("\n"));
}
