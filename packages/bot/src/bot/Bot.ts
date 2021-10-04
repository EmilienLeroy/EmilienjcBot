import { ChatUserstate } from "tmi.js";

export interface BotCommand {
  name: string;
  exec: (channel: string, userstate: ChatUserstate, message: string) => Promise<void>;
}