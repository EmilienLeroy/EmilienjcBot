import { Client } from "tmi.js";

interface BotServiceContructor {
  client: Client, 
}

export default class BotService {
    private client: Client;
    private connected: boolean;

    constructor({ client }: BotServiceContructor) {
      this.client = client;
      this.connected = false;
    }

    public get isConnected() {
      return this.connected;
    }

    public async start() {
      try {
        await this.client.connect();
        this.connected = true;  
      } catch (error) {

      }
    }
}