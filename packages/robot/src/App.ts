import { Client } from 'mqtt';
import { Gpio } from 'onoff';
import { BotService } from './bot';
import { LedService } from './led';
import { CarService, Drive, L2930Drive } from './car';
import { CommandManager } from '@emilienjc/command';
import { container } from 'tsyringe';


interface AppConstructor {
  mqtt: Client;
  led: Gpio;
}

export class App {
  private botService: BotService;
  

  constructor({ mqtt, led }: AppConstructor) {
    container.register<CommandManager>('commands', { useValue: new CommandManager() });
    container.register<Client>('mqtt', {  useValue: mqtt });
    container.register<Gpio>('led', { useValue: led });

    // @TODO: USE ENV VAR
    container.register<Drive>('drive', { 
      useValue: new L2930Drive({
        motor1: {
          A: new Gpio(4, 'out'),
          B: new Gpio(17, 'out'),
          enable: new Gpio(16, 'out'),
        },
        motor2: {
          A: new Gpio(20, 'out'),
          B: new Gpio(21, 'out'),
          enable: new Gpio(22, 'out'),
        }
      }),
    });
    
    container.resolve(LedService);
    container.resolve(CarService);

    this.botService = container.resolve(BotService);
  }

  public start() {
    this.botService.start();
  }
}