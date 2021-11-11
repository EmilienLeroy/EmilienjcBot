import { CommandManager, QueuedCommand } from "@emilienjc/command";
import { IPublishPacket } from "mqtt";
import { container, inject, singleton } from "tsyringe";
import { Display } from "./display";

@singleton()
export class ScreenService {
  private displays?: Display[];

  constructor(
    @inject('commands') commandManager: CommandManager<Buffer, IPublishPacket>,
  ) {
    try {
      this.displays = container.resolveAll('display');
      this.displays.forEach((display) => display.displayReady());
      commandManager.on('consumeQueue', this.displayCommand.bind(this));
    } catch (error) {
      console.warn('No display configured, you won\'t be able to see the robot state !')
    }
  }

  public displayCommand(command: QueuedCommand<Buffer, IPublishPacket>) {
    const { subscriber } = command.params
    let message = '';

    try {
      message = JSON.parse(command.params.payload.toString()).action;  
    } catch (error) {
      message = command.params.payload.toString();
    }
    
    this.displays?.forEach((d) => d.displayCommand(`${subscriber} ${message}`));
  }

}