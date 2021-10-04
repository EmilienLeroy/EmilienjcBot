import { Aedes } from "aedes";
import { createServer, Server } from 'net';
import { ChatUserstate, Userstate } from "tmi.js";
import { inject, singleton } from "tsyringe";
import { CommandManager, Command } from "@emilienjc/command";

@singleton()
export default class RobotService {
  private mqtt: Aedes;
  
  private commandManager: CommandManager;

  private server: Server;
  
  constructor(
    @inject('mqtt') mqtt: Aedes, 
    @inject('commands') commandManager: CommandManager
  ) {
    this.mqtt = mqtt;
    this.commandManager = commandManager;
    this.server = createServer(mqtt.handle);
  }

  public onStart() {
    const led = {
      name: '!led',
      exec: async (subscriber, payload: Userstate, message: string) => {
        const status = message.split(' ')[1];

        if (status === 'up' || status === 'down') {
          this.mqtt.publish({ topic: '/led', payload: status } as any, (err) => {})
        }
      }
    } as Command;

    this.commandManager.registerCommand(led);
  }

  public async start() {
    return new Promise<void>((res) => {
      this.server.listen(1883, () => {
        this.onStart();
        res();
      });
    })
  }
}