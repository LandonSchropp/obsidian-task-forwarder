import { TFile, App } from "obsidian";

const DAILY_NOTES_FOLDER = "Daily Notes";

/**
 * Fetches all notes from the provided folder and its subfolders.
 * @param vault The Obsidian vault instance.
 * @param folder The folder to fetch the notes from.
 * @returns The notes from the provided folder and its subfolders.
 */
export function fetchFilesFromFolder(app: App, folder: string): TFile[] {
  return app.vault.getFiles().filter((file) => file.path.startsWith(folder));
}

/**
 * Fetches the notes from the provided number of days, sorted in _descending_ order.
 * @param app The Obsidian app instance.
 * @param editor The Obsidian editor instance.
 * @param numberOfDays The number of days to fetch the notes from.
 */
export function fetchDailyNotes(app: App): [TFile | undefined, TFile | undefined] {
  // Fetch all of the daily notes
  const allDailyNotes = fetchFilesFromFolder(app, DAILY_NOTES_FOLDER);

  // Sort files in descending order by their names
  const sortedDailyNotes = allDailyNotes.sort((a, b) => b.name.localeCompare(a.name));

  // Get today's and yesterday's notes
  // Return a tuple of yesterday and today's daily notes
  const [today, yesterday] = sortedDailyNotes;
  return [today, yesterday];
}
