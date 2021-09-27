import { Client } from 'mqtt';
import { Gpio } from 'onoff';
import { BotService } from './bot';
import { LedService } from './led';

interface AppConstructor {
  mqtt: Client;
  gpio: Gpio;
}

export class App {
  private botService: BotService;
  private ledService: LedService;

  constructor({ mqtt, gpio }: AppConstructor) {
    this.botService = new BotService({ mqtt });
    this.ledService = new LedService({ gpio });
  }

  public start() {
    this.botService.start();
    this.ledService.up();
  }
}