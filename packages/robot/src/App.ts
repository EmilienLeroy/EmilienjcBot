import { Client } from 'mqtt';
import { Gpio } from 'onoff';
import { BotService } from './bot';
import { LedService } from './led';
import { CarService, Drive } from './car';
import { CommandManager } from '@emilienjc/command';
import { container } from 'tsyringe';


interface AppConstructor {
  mqtt: Client;
  leds: Gpio[];
  drives?: Drive[];
}

export class App {
  private botService: BotService;
  
  constructor({ mqtt, leds, drives = [] }: AppConstructor) {
    container.register<CommandManager>('commands', { useValue: new CommandManager() });
    container.register<Client>('mqtt', {  useValue: mqtt });

    leds.forEach((l) => container.register<Gpio>('led', { useValue: l }));
    drives.forEach((d) => container.register<Drive>('drive', { useValue: d }));
    
    container.resolve(LedService);
    container.resolve(CarService);

    this.botService = container.resolve(BotService);
  }

  public start() {
    this.botService.start();
  }
}