import { injectable } from "tsyringe";
import { QueuedCommand } from ".";
import { Command } from "./Command";

@injectable()
export default class CommandManager<T, S> {
  private commands: Command<T, S>[] = [];

  private queue: QueuedCommand<T, S>[] = [];

  private queueInProgress: boolean = false;

  public get queueIsEmpty(): boolean {
    return this.queue.length === 0
  };

  public getCommand(commandName: string) {
    return this.commands.find(({ name }) => commandName.match(name));
  }

  public registerCommand(command: Command<T, S>) {
    this.commands.push(command);
  }

  public registerCommands(commands: Command<T, S>[]) {
    commands.forEach((command) => this.registerCommand(command));
  }

  public addToQueue(
    command: Command<T, S>, params: {
      subscriber: string, 
      payload: T, 
      message: S 
    }) {

    this.queue.push({
      command, 
      params,
    });

    if (!this.queueInProgress) {
      this.consumeQueue();
    } 
  }

  public async consumeQueue() {
    this.queueInProgress = true;

    if (!this.queueIsEmpty) {
      const { command, params } = this.queue[0]; 
      
      await command.exec(params.subscriber, params.payload, params.message);
      this.queue = this.queue.slice(1);
    }

    if (this.queueIsEmpty) {
      this.queueInProgress = false;
      return;
    }

    await this.consumeQueue();
  }
}