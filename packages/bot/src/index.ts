require('dotenv').config();
import "reflect-metadata";
import aedes from 'aedes';
import { Client } from 'tmi.js';
import { App } from './App';
const { 
  TWITCH_CHANNEL, 
  TWITCH_DEBUG, 
  TWITCH_LOG_LEVEL,
  TWITCH_USER,
  TWITCH_TOKEN,
} = process.env;

async function bootstrap() {
    try {
        const app = new App({
          client: new Client({
            options: { 
              debug: TWITCH_DEBUG === 'true', 
              messagesLogLevel: TWITCH_LOG_LEVEL 
            },
            connection: {
                reconnect: true,
                secure: true
            },
            identity: {
              username: TWITCH_USER,
              password: `oauth:${TWITCH_TOKEN}`
            },
            channels: [TWITCH_CHANNEL as string]
          }),
          mqtt: aedes(),
        });

        await app.start();
    } catch (error) {
        console.log(error);
    }
}

bootstrap();
