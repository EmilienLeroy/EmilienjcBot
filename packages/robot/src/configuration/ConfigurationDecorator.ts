import { CommandManager } from "@emilienjc/command";
import { Client, connect, IPublishPacket } from "mqtt";
import { Gpio } from "onoff";
import { container } from "tsyringe";
import { Drive } from "../car";
import { ConfigurationSchema } from "./Configuration";

export default function ConfigurationDecorator({ mqtt, leds, drives }: ConfigurationSchema) {
  let ledsParse: Gpio[] = [];
  
  if (typeof leds === 'string') {
    ledsParse = leds.split(',')
      .map((l) => {
        const led = Number(l.trim().replace('[', '').replace(']', ''))

        return new Gpio(led, 'out');
      });
  }

  if (Array.isArray(leds)) {
    ledsParse = leds.map((led) => {
      if (typeof led === 'number') {
        return new Gpio(led, 'out');
      }
    }).filter(x => !!x) as Gpio[];
  } 

  return (constructor: Function) => {
    container.register<CommandManager<Buffer, IPublishPacket>>('commands', { useValue: new CommandManager() });
    container.register<Client>('mqtt', {  useValue: connect(mqtt.brokerUrl, mqtt.opts) });

    ledsParse.forEach((l) => container.register<Gpio>('led', { useValue: l }));
    drives?.forEach((d) => container.register<Drive>('drive', { useValue: d }));
  }
}