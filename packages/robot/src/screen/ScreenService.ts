import { CommandManager } from "@emilienjc/command";
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
    } catch (error) {
      console.warn('No display configured, you won\'t be able to see the robot state !')
    }
  }

}