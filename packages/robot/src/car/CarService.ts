import { Command, CommandManager } from "@emilienjc/command";
import { IPublishPacket } from "mqtt";
import { container, inject, injectAll, singleton } from "tsyringe";
import { Drive } from "./drive";

type CarDirection = 'forward' | 'backward' | 'turnLeft' | 'turnRight'

@singleton()
export class CarService {
  private drives?: Drive[];

  constructor(
    @inject('commands') commandManager: CommandManager<Buffer, IPublishPacket>,
  ) {
    try {
      this.drives = container.resolveAll('drive');

      commandManager.registerCommand({
        name: '/car',
        exec: this.onCarMessage.bind(this)
      } as Command<Buffer, IPublishPacket>)
    } catch (error) {
      console.warn('No drive configured, the car will not forward ')
    }
  }

  public async move(direction: CarDirection, delay?: string | number) {
    this.drives?.forEach((d) => d[direction]());
    await this.stop(delay);
  }

  public stop(delay?: string | number): Promise<void> {
    return new Promise((res) => {
      if (typeof delay === 'string') {
        delay = Number(delay)
      }
      
      if (!delay || Number.isNaN(delay)) {
        delay = 1000;
      }
  
      setTimeout(() => {
        this.drives?.forEach((d) => d.stop());
        res();
      }, delay);
    });
  }

  private async onCarMessage(topic: string, payload: Buffer, packet: IPublishPacket) {
    const { action, delay } = JSON.parse(payload.toString());

    switch (action) {
      case 'forward':
        await this.move('forward', delay);
        break;

      case 'backward':
        await this.move('backward', delay);
        break;

      case 'right':
        await this.move('turnRight', delay);
        break;
      
      case 'left':
        await this.move('turnLeft', delay);
        break;

      default:
        break;
    }
  }
}