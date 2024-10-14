import { Plugin } from "obsidian";
import { forwardTasks } from "./commands";

export default class TaskForwarderPlugin extends Plugin {
  async onload() {
    this.addCommand({
      id: "forward-tasks",
      name: "Forward Tasks",
      icon: "forward",
      callback: () => forwardTasks(this.app),
    });
  }
}
