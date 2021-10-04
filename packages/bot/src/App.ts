import { Aedes } from "aedes";
import { Client } from "tmi.js";
import { container } from "tsyringe";
import { BotService } from "./bot";
import { RobotService } from "./robot";

interface AppConstructor {
  client: Client;
  mqtt: Aedes;
}

export class App {
  private botService: BotService;
  
  private robotService: RobotService;

  constructor({ client, mqtt }: AppConstructor) {
    container.register<Client>('irc', {  useValue: client })
    container.register<Aedes>('mqtt', { useValue: mqtt })
    
    this.botService = container.resolve(BotService)
    this.robotService = container.resolve(RobotService);
  }

  public async start() {
    await this.botService.start();
    await this.robotService.start();
  }
}