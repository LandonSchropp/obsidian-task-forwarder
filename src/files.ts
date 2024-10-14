import { TFile, App, TAbstractFile } from "obsidian";

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
 * Fetches the notes from the provided number of days, sorted in _descending_ order.
 * @param app The Obsidian app instance.
 * @param editor The Obsidian editor instance.
 * @param numberOfDays The number of days to fetch the notes from.
 */
export function fetchDailyNotes(app: App): [TFile | undefined, TFile | undefined] {
  const dailyNotes = app.vault
    .getFiles()
    .filter(isDailyNote)
    .sort((a, b) => b.name.localeCompare(a.name));

  return [dailyNotes[0], dailyNotes[1]];
}
