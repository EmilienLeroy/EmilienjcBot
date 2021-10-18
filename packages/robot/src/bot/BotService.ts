import { Client, IPublishPacket } from 'mqtt';
import { inject, singleton } from 'tsyringe';
import { CommandManager } from '@emilienjc/command';

@singleton()
export default class BotService {
  private mqtt: Client;
  private commandManager: CommandManager;

  constructor(
    @inject('mqtt') mqtt: Client,
    @inject('commands') commandManager: CommandManager
  ) {
    this.mqtt = mqtt;
    this.commandManager = commandManager;
  }

  public start() {
    this.mqtt.on('connect', this.onConnect.bind(this));
    this.mqtt.on('error', this.onError.bind(this));
    this.mqtt.on('message', this.onMessage.bind(this));
    this.mqtt.subscribe('/led');
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
      await command.exec(topic, payload, packet);
    }
  }
}