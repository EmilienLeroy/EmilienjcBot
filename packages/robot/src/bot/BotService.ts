import { Client, IPublishPacket } from 'mqtt';
import { inject, singleton } from 'tsyringe';
import { CommandManager } from '@emilienjc/command';

@singleton()
export default class BotService {
  private mqtt: Client;
  private commandManager: CommandManager<Buffer, IPublishPacket>;

  constructor(
    @inject('mqtt') mqtt: Client,
    @inject('commands') commandManager: CommandManager<Buffer, IPublishPacket>
  ) {
    this.mqtt = mqtt;
    this.commandManager = commandManager;
  }

  public start() {
    this.mqtt.on('connect', this.onConnect.bind(this));
    this.mqtt.on('error', this.onError.bind(this));
    this.mqtt.on('message', this.onMessage.bind(this));

    // @TODO: Move directly into the good service.
    this.mqtt.subscribe('/led');
    this.mqtt.subscribe('/car');
  }

  private onConnect() {
    console.log('connected');
  }

  private onError(error: string) {
    console.log(error);
  }

  private async onMessage(topic: string, payload: Buffer, packet: IPublishPacket) {
    const command = this.commandManager.getCommand(topic);

    if (command) {
      this.commandManager.addToQueue(command, {
        subscriber: topic,
        message: packet,
        payload,
      });
    }
  }
}