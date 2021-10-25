import { Client } from 'mqtt';
import { Gpio } from 'onoff';
import { BotService } from './bot';
import { LedService } from './led';
import { CarService, L293DDrive } from './car';
import { container } from 'tsyringe';
import { Configuration } from './configuration';

const {
  BOT_URL,
  LED_GPIO,
  DRIVE_L293D_LEFT_A,
  DRIVE_L293D_LEFT_B,
  DRIVE_L293D_LEFT_ENABLE,
  DRIVE_L293D_RIGHT_A,
  DRIVE_L293D_RIGHT_B,
  DRIVE_L293D_RIGHT_ENABLE,
} = process.env;

@Configuration({
  mqtt: {
    brokerUrl: BOT_URL as string,
  },
  leds: LED_GPIO,
  drives: [
    new L293DDrive({
      left: {
        A: new Gpio(Number(DRIVE_L293D_LEFT_A), 'out'),
        B: new Gpio(Number(DRIVE_L293D_LEFT_B), 'out'),
        enable: new Gpio(Number(DRIVE_L293D_LEFT_ENABLE), 'out'),
      },
      right: {
        A: new Gpio(Number(DRIVE_L293D_RIGHT_A), 'out'),
        B: new Gpio(Number(DRIVE_L293D_RIGHT_B), 'out'),
        enable: new Gpio(Number(DRIVE_L293D_RIGHT_ENABLE), 'out'),
      }
    })
  ]
})
export class App {
  private botService: BotService;
  
  constructor() {
    container.resolve(LedService);
    container.resolve(CarService);

    this.botService = container.resolve(BotService);
  }

  public start() {
    this.botService.start();
  }
}