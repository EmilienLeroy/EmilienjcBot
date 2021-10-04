import { ChatUserstate, Client } from "tmi.js";
import { inject, singleton } from "tsyringe";
import { CommandManager, Command } from "@emilienjc/command";

@singleton()
export default class BotService {
    private client: Client;
    private connected: boolean;
    private commandManager: CommandManager;

    constructor(
      @inject('irc') client: Client,
      @inject('commands') commandManager: CommandManager
    ) {
      this.client = client;
      this.commandManager = commandManager;
      this.connected = false;
    }

    public get isConnected() {
      return this.connected;
    }

    public get defaultCommands(): Command[] {
      return [
        {
          name: '!hello',
          exec: async (channel) => {
            this.client.say(channel, 'world');
          }
        }
      ]
    }

    public async start() {
      try {
        await this.client.connect();
        this.commandManager.registerCommands(this.defaultCommands);
        this.client.on('message', this.onMessage.bind(this));

        this.connected = true; 
      } catch (error) {

      }
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

      const command = this.commandManager.getCommand(message.toLocaleLowerCase());
      
      if (command) {
        await command.exec(channel, userstate, message);
      }
    }
}