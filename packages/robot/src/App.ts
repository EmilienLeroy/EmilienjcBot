import { Client } from 'mqtt';
import { Gpio } from 'onoff';
import { BotService } from './bot';
import { LedService } from './led';
import { CarService, Drive, L293DDrive } from './car';
import { CommandManager } from '@emilienjc/command';
import { container } from 'tsyringe';


interface AppConstructor {
  mqtt: Client;
  led: Gpio;
  drives?: Drive[];
}

export class App {
  private botService: BotService;
  
  constructor({ mqtt, led, drives = [] }: AppConstructor) {
    container.register<CommandManager>('commands', { useValue: new CommandManager() });
    container.register<Client>('mqtt', {  useValue: mqtt });
    container.register<Gpio>('led', { useValue: led });

    drives.forEach((d) => container.register<Drive>('drive', { useValue: d }))
    
    container.resolve(LedService);
    container.resolve(CarService);

    this.botService = container.resolve(BotService);
  }

  public start() {
    this.botService.start();
  }
}