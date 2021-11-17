import { CommandManager } from "@emilienjc/command";
import { Client, connect, IPublishPacket } from "mqtt";
import { Gpio } from "onoff";
import { container } from "tsyringe";
import { Drive } from "../car";
import { Display } from "../screen";
import { configureLed } from "./ConfigurationLed";
import { configureDrive } from './ConfigurationDrive';
import { configureDisplay } from "./ConfigurationDisplay";
const { BOT_URL } = process.env;

export default function ConfigurationDecorator() {
  return (constructor: Function) => {
    container.register<CommandManager<Buffer, IPublishPacket>>('commands', { useValue: new CommandManager() });
    container.register<Client>('mqtt', {  useValue: connect(BOT_URL) });

    configureLed().forEach((l) => container.register<Gpio>('led', { useValue: l }));
    configureDrive().forEach((d) => container.register<Drive>('drive', { useValue: d }));
    configureDisplay().forEach((d) => container.register<Display>('display', { useValue: d }));
  }
}