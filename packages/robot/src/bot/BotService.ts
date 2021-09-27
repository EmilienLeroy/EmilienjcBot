import { Client, IPublishPacket } from 'mqtt';

interface BotServiceConstructor {
  mqtt: Client;
}

export default class BotService {
  private mqtt: Client;

  constructor({ mqtt }: BotServiceConstructor) {
    this.mqtt = mqtt;
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

  private onMessage(topic: string, payload: Buffer, packet: IPublishPacket) {
    
  }
}