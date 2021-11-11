import { IClientOptions } from "mqtt";
import { Drive } from "../car";
import { Display } from "../screen";

export interface ConfigurationSchema {
  mqtt: {
    brokerUrl: string, 
    opts?: IClientOptions | undefined
  };
  leds?: number[] | string;
  drives?: Drive[];
  displays?: Display[];
}