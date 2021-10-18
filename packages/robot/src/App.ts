import { Client } from 'mqtt';
import { Gpio } from 'onoff';
import { BotService } from './bot';
import { LedService } from './led';
import { CommandManager } from '@emilienjc/command';
import { container } from 'tsyringe';

interface AppConstructor {
  mqtt: Client;
  led: Gpio;
}

export class App {
  private botService: BotService;
  private ledService: LedService;

  constructor({ mqtt, led }: AppConstructor) {
    container.register<Client>('mqtt', {  useValue: mqtt })
    container.register<Gpio>('led', { useValue: led })
    container.register<CommandManager>('commands', CommandManager);

    this.botService = container.resolve(BotService);
    this.ledService = container.resolve(LedService);
  }

  public start() {
    this.botService.start();
  }
}