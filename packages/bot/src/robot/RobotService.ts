import { Aedes } from "aedes";
import { createServer, Server } from 'net';
import { ChatUserstate, Userstate } from "tmi.js";
import { inject, singleton } from "tsyringe";
import { CommandManager, Command } from "@emilienjc/command";

@singleton()
export default class RobotService {
  private mqtt: Aedes;
  
  private commandManager: CommandManager<ChatUserstate, string>;

  private server: Server;
  
  constructor(
    @inject('mqtt') mqtt: Aedes, 
    @inject('commands') commandManager: CommandManager<ChatUserstate, string>
  ) {
    this.mqtt = mqtt;
    this.commandManager = commandManager;
    this.server = createServer(mqtt.handle);
  }

  public onStart() {
    this.commandManager.registerCommands([
      {
        name: '!led',
        exec: this.publishLed.bind(this)
      },{
        name: '!car',
        exec: this.publishCar.bind(this)
      }
    ] as Command<ChatUserstate, string>[]);
  }

  async publishLed(subscriber: string, payload: Userstate, message: string) {
    const status = message.split(' ')[1];

    if (status === 'up' || status === 'down') {
      this.mqtt.publish({ topic: '/led', payload: status } as any, (err) => {})
    }
  }

  async publishCar(subscriber: string, payload: Userstate, message: string) {
    const [topic, action, delay] = message.split(' ');

    if (['forward', 'backward', 'left', 'right'].includes(action)) {
      this.mqtt.publish({ 
        topic: '/car', 
        payload: JSON.stringify({ action, delay }), 
      } as any, (err) => {})
    }
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