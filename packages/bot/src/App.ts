import { Aedes } from "aedes";
import { Client } from "tmi.js";
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
    this.botService = new BotService({ client });
    this.robotService = new RobotService({ mqtt, bot: this.botService });
  }

  public async start() {
    await this.botService.start();
    await this.robotService.start();
  }
}