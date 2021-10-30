import EventEmitter from "events";
import { injectable } from "tsyringe";
import { Command, QueuedCommand } from "./Command";

declare interface CommandManager<T, S> {
  on(event: 'addedToQueue', listener: (queuedCommand: QueuedCommand<T, S>) => void): this;
  on(event: 'consumeQueue', listener: (queuedCommand: QueuedCommand<T, S>) => void): this;
}

@injectable()
class CommandManager<T, S> extends EventEmitter {
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

  public addToQueue(command: Command<T, S>, params: {
    subscriber: string, 
    payload: T, 
    message: S 
  }) {
    this.queue.push({ command, params });
    this.emit('addedToQueue', { command, params });

    if (!this.queueInProgress) {
      this.consumeQueue();
    } 
  }

  public async consumeQueue() {
    this.queueInProgress = true;

    if (!this.queueIsEmpty) {
      const { command, params } = this.queue[0]; 
      
      this.emit('consumeQueue', { command, params });
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

export default CommandManager;