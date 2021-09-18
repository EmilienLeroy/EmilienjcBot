require('dotenv').config();
import { Client } from 'tmi.js';
import { App } from './App';
const { TWITCH_CHANNEL } = process.env;

async function bootstrap() {
    try {
        const app = new App({
          client: new Client({
            options: { debug: true, messagesLogLevel: "info" },
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
