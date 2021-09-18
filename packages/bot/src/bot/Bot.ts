import { ChatUserstate, Client } from "tmi.js";

export interface BotServiceContructor {
  client: Client, 
}

export interface BotCommand {
  name: string;
  exec: (channel: string, userstate: ChatUserstate, message: string) => Promise<void>;
}