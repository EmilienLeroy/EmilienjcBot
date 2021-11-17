import { BotService } from './bot';
import { LedService } from './led';
import { CarService } from './car';
import { container } from 'tsyringe';
import { Configuration } from './configuration';
import { ScreenService } from './screen';

@Configuration()
export class App {
  private botService: BotService;
  
  constructor() {
    container.resolve(LedService);
    container.resolve(CarService);
    container.resolve(ScreenService);

    this.botService = container.resolve(BotService);
  }

  public start() {
    this.botService.start();
  }
}