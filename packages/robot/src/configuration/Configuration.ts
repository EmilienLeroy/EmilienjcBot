import { IClientOptions } from "mqtt";
import { Drive } from "../car";

export interface ConfigurationSchema {
  mqtt: {
    brokerUrl: string, 
    opts?: IClientOptions | undefined
  };
  leds?: number[] | string;
  drives?: Drive[];
}