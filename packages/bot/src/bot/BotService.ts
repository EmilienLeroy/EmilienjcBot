import { ChatUserstate, Client } from "tmi.js";
import { BotCommand, BotServiceContructor } from "./Bot";

export default class BotService {
    private client: Client;
    private connected: boolean;
    private commands: BotCommand[];

    constructor({ client }: BotServiceContructor) {
      this.client = client;
      this.connected = false;
      this.commands = [];
    }

    public get isConnected() {
      return this.connected;
    }

    public async start() {
      try {
        await this.client.connect();
        this.client.on('message', this.onMessage.bind(this));

        this.connected = true; 
      } catch (error) {

      }
    }

    public getCommand(commandName: string) {
      return this.commands.find(({ name }) => name === commandName);
    }

    public registerCommand(command: BotCommand) {
      this.commands.push(command);
    }

    public async onMessage(
      channel: string, 
      userstate: ChatUserstate, 
      message: string, 
      self: boolean
    ) {
      if (self) {
        return;
      }

      const command = this.getCommand(message.toLocaleLowerCase());
      
      if (command) {
        await command.exec(channel, userstate, message);
      }
    }
}