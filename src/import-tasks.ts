import { App, Pos, TFile } from "obsidian";
import { Task, TaskType } from "./types";
import { ACTIONABLE_TASK_TYPES } from "./constants";

/**
 * Extracts the provided position from an array of lines.
 * @param lines The lines to extract the position from.
 * @param position The position to extract from the lines.
 * @returns The text that was extracted from the lines.
 */
function extract(lines: string[], position: Pos): string[] {
  // If the lines are empty, ignore them.
  if (lines.length === 0) {
    return [];
  }

  // Grab the relevant lines
  lines = lines.slice(position.start.line, position.end.line + 1);

  // Trim the lines. This must be done separately, since it's possible that the item only has one
  // line.
  lines[0] = lines[0].slice(position.start.col);
  lines[lines.length - 1] = lines[lines.length - 1].slice(0, position.end.col);

  // Return the extracted lines
  return lines;
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
  const fileCache = app.metadataCache.getFileCache(file);

  if (!fileCache) {
    throw new Error(`Could not find the file cache for ${file.name}`);
  }

  // TODO: Reading the tasks from the file cache doesn't account for their headers. This should be
  // updated to only include tasks from the Tasks header.
  const listItems = fileCache.listItems ?? [];

  return listItems
    .filter((item) => ACTIONABLE_TASK_TYPES.includes(item.task as TaskType))
    .map((item) => {
      const position = item.position;

      return {
        text: extract(lines, position),
        type: item.task as TaskType,
      };
    });
}
