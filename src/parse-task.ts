import { TASK_TYPES } from "./constants";
import { Task, TaskType } from "./types";

/**
 * Parses a line of text into a Task object.
 * @param line The line of text to parse.
 * @returns The Task object that was parsed from the line, or undefined if the line could not be
 * parsed.
 */
export function parseTask(line: string): Task | undefined {
  const match = line.match(/^\s*[-*] \[(.)\] /);

  if (match === null) {
    return;
  }

  if (!TASK_TYPES.includes(match[1] as TaskType)) {
    return;
  }

  return {
    type: match[1] as TaskType,
    text: line,
  };
}
