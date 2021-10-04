import { injectable } from "tsyringe";
import { Command } from "./Command";

@injectable()
export default class CommandManager {
  private commands: Command[] = [];

  public getCommand(commandName: string) {
    return this.commands.find(({ name }) => commandName.match(name));
  }

  public registerCommand(command: Command) {
    this.commands.push(command);
  }

  public registerCommands(commands: Command[]) {
    commands.forEach((command) => this.registerCommand(command));
  }
}