import { Notice } from "obsidian";

/**
 * Displays a notification.
 * @param message The message to display in the notification.
 */
export function displayNotification(message: string): void {
  new Notice(message);
}

/**
 * Displays a warning notification.
 * @param message The message to display in the notification.
 */
export function displayWarning(message: string): void {
  displayNotification(`⚠️  ${message}`);
}
