import { TFile, App, TAbstractFile } from "obsidian";
import { Temporal } from "@js-temporal/polyfill";

const DAILY_NOTES_FOLDER = "Daily Notes";

/**
 * Determines if the provided file is a daily note.
 * @param file The file to check.
 * @returns True if the file is a daily note, false otherwise.
 */
export function isDailyNote(file: TAbstractFile): boolean {
  if (!(file instanceof TFile)) {
    return false;
  }

  return file.path.startsWith(DAILY_NOTES_FOLDER) && file.extension === "md";
}

/**
 * Determines if the provided file is today's daily note.
 *
 * @param file The file to check.
 * @returns True if the file is today's daily note, false otherwise.
 */
export function isTodaysDailyNote(file: TAbstractFile): boolean {
  if (!(file instanceof TFile)) {
    return false;
  }

  const today = Temporal.Now.plainDateISO().toString();
  return isDailyNote(file) && file.name.startsWith(today);
}

/**
 * Fetches today's an yesterday's daily notes.
 * @param app The Obsidian app instance.
 * @returns A tuple containing today's and yesterday's daily notes, or undefined if they don't
 * exist.
 */
export function fetchDailyNotes(app: App): [TFile | undefined, TFile | undefined] {
  const dailyNotes = app.vault.getFiles().filter(isDailyNote);

  const date = Temporal.Now.plainDateISO();
  const today = date.toString();
  const yesterday = date.subtract({ days: 1 }).toString();

  return [
    dailyNotes.find((note) => note.name.startsWith(today)),
    dailyNotes.find((note) => note.name.startsWith(yesterday)),
  ];
}
