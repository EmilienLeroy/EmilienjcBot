import { Aedes } from "aedes";
import { createServer, Server } from 'net';
import { ChatUserstate } from "tmi.js";
import { BotService } from "../bot";

interface RobotConstructor {
  mqtt: Aedes;
  bot: BotService;
}

export default class RobotService {
  private mqtt: Aedes;
  
  private bot: BotService;

  private server: Server;
  
  constructor({ mqtt, bot }: RobotConstructor) {
    this.mqtt = mqtt;
    this.bot = bot;
    this.server = createServer(mqtt.handle);
  }

  public onStart() {
    this.bot.registerCommand({
      name: '!led',
      exec: async (channel: string, userstate: ChatUserstate, message: string) => {
        const status = message.split(' ')[1];

        if (status === 'up' || status === 'down') {
          this.mqtt.publish({ topic: '/led', payload: status } as any, (err) => {})
        }
      }
    })
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