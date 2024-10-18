import { Plugin } from "obsidian";
import { forwardTasks } from "./forward-tasks";
import { isFile, parseDateFromDailyNoteName } from "./files";
import { Temporal } from "@js-temporal/polyfill";

export default class TaskForwarderPlugin extends Plugin {
  async onload() {
    this.addCommand({
      id: "forward-tasks",
      name: "Forward Tasks to Today's Daily Note",
      icon: "forward",
      callback: () => forwardTasks(this.app, Temporal.Now.plainDateISO()),
    });

    // Run the forwarder when a new daily note is created.
    this.app.workspace.onLayoutReady(() => {
      this.registerEvent(
        this.app.vault.on("create", (file) => {
          if (isFile(file)) {
            forwardTasks(this.app, parseDateFromDailyNoteName(file));
          }
        }),
      );
    });
  }
}
