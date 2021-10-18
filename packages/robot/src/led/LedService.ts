import { Gpio } from "onoff";
import { inject, singleton } from "tsyringe";
import { CommandManager, Command } from "@emilienjc/command";
import { IPublishPacket } from "mqtt";

@singleton()
export default class LedService {
  private gpio: Gpio;

  constructor(
    @inject('led') led: Gpio,
    @inject('commands') commandManager: CommandManager
  ) {
    this.gpio = led;

    commandManager.registerCommand({
      name: '/led',
      exec: this.onLedMessage.bind(this)
    } as Command)
  }

  public up() {
    this.gpio.writeSync(1);
  }

  public down() {
    this.gpio.writeSync(0);
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