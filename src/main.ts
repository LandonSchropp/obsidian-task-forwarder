import { Plugin } from "obsidian";
import { forwardTasks } from "./forward-tasks";
import { isDailyNote } from "./files";

export default class TaskForwarderPlugin extends Plugin {
  async onload() {
    this.addCommand({
      id: "forward-tasks",
      name: "Forward Tasks",
      icon: "forward",
      callback: () => forwardTasks(this.app),
    });

    // Run the forwarder when a new daily note is created.
    this.app.workspace.onLayoutReady(() => {
      this.registerEvent(
        this.app.vault.on("create", (file) => {
          if (isDailyNote(file)) {
            forwardTasks(this.app);
          }
        }),
      );
    });
  }
}
