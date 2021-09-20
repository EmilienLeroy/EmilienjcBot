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

    public get defaultCommands(): BotCommand[] {
      return [
        {
          name: '!hello',
          exec: async (channel, userstate: ChatUserstate, message: string) => {
            this.client.say(channel, 'world');
          }
        }
      ]
    }

    public async start() {
      try {
        await this.client.connect();
        this.registerCommands(this.defaultCommands);
        this.client.on('message', this.onMessage.bind(this));

        this.connected = true; 
      } catch (error) {

      }
    }

    public getCommand(commandName: string) {
      return this.commands.find(({ name }) => commandName.match(name));
    }

    public registerCommand(command: BotCommand) {
      this.commands.push(command);
    }

    public registerCommands(commands: BotCommand[]) {
      commands.forEach((command) => this.registerCommand(command));
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