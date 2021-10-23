import { Gpio } from "onoff";
import { container, inject, singleton } from "tsyringe";
import { CommandManager, Command } from "@emilienjc/command";
import { IPublishPacket } from "mqtt";

@singleton()
export default class LedService {
  private leds?: Gpio[];

  constructor(
    @inject('commands') commandManager: CommandManager
  ) {
    try {
      this.leds = container.resolveAll('led');  
      
      commandManager.registerCommand({
        name: '/led',
        exec: this.onLedMessage.bind(this)
      } as Command)
    } catch (error) {
      console.warn('No led configured nothing will light your day')
    }
  }

  public up() {
    this.leds?.forEach((led) => led.writeSync(1));
  }

  public down() {
    this.leds?.forEach((led) => led.writeSync(0));
  }

  private onLedMessage(topic: string, payload: Buffer, packet: IPublishPacket) {
    switch (payload.toString()) {
      case 'up':
        return this.up();
      
      case 'down':
        return this.down();
    
      default:
        break;
    }
  }
}