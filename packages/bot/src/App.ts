import { Client } from "tmi.js";
import { BotService } from "./bot";

interface AppConstructor {
  client: Client;
}

export class App {
  private botService: BotService;

  constructor({ client }: AppConstructor) {
    this.botService = new BotService({ client });
  }

  public async start() {
    await this.botService.start();
  }
}