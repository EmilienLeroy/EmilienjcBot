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
  

  constructor({ mqtt, led }: AppConstructor) {
    container.register<Client>('mqtt', {  useValue: mqtt })
    container.register<Gpio>('led', { useValue: led })
    container.register<CommandManager>('commands', { useValue: new CommandManager() });
    container.resolve(LedService);

    this.botService = container.resolve(BotService);
  }

  public start() {
    this.botService.start();
  }
}