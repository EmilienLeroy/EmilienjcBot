require('dotenv').config();
import { Client } from 'tmi.js';
import { App } from './App';
const { TWITCH_CHANNEL, TWITCH_DEBUG, TWITCH_LOG_LEVEL } = process.env;

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
            channels: [TWITCH_CHANNEL as string]
          })
        });

        await app.start();
    } catch (error) {
        console.log(error);
    }
}

bootstrap();
