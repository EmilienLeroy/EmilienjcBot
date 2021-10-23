import { Command, CommandManager } from "@emilienjc/command";
import { IPublishPacket } from "mqtt";
import { container, inject, injectAll, singleton } from "tsyringe";
import { Drive } from "./drive";

@singleton()
export class CarService {
  private drives?: Drive[];

  constructor(
    @inject('commands') commandManager: CommandManager,
  ) {
    try {
      this.drives = container.resolveAll('drive');

      commandManager.registerCommand({
        name: '/car',
        exec: this.onCarMessage.bind(this)
      } as Command)
    } catch (error) {
      console.warn('No drive configured, the car will not forward ')
    }
  }

  public forward(delay?: string | number) {
    this.drives?.forEach((d) => d.forward());
    this.stop(delay);
  }

  public stop(delay?: string | number) {
    if (typeof delay === 'string') {
      delay = Number(delay)
    }
    
    if (!delay || Number.isNaN(delay)) {
      delay = 1000;
    }

    setTimeout(() => {
      this.drives?.forEach((d) => d.stop());
    }, delay);
  }

  private onCarMessage(topic: string, payload: Buffer, packet: IPublishPacket) {
    const { action, delay } = JSON.parse(payload.toString());

    switch (action) {
      case 'forward':
        this.forward(delay);
        break;

      case 'backward':
        // @TODO: Add backward method
        break;

      case 'right':
        // @TODO: Add right method
        break;
      
      case 'left':
        // @TODO: Add left method
        break;

      default:
        break;
    }
  }
}