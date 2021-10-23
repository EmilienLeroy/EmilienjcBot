require('dotenv').config();
import "reflect-metadata";
import { connect } from "mqtt";
import { Gpio } from "onoff";
import { App } from "./App";
import { L293DDrive } from "./car";

const {
  BOT_URL,
  LED_GPIO,
  DRIVE_L293D_LEFT_A,
  DRIVE_L293D_LEFT_B,
  DRIVE_L293D_LEFT_ENABLE,
  DRIVE_L293D_RIGHT_A,
  DRIVE_L293D_RIGHT_B,
  DRIVE_L293D_RIGHT_ENABLE,
} = process.env;

async function bootstrap() {
  try {
    const drives = [];
    const leds = [];
    
    if (typeof LED_GPIO === 'string') {
      leds.push(...LED_GPIO
        .split(',')
        .map((l) => {
          const led = Number(l.trim().replace('[', '').replace(']', ''))

          return new Gpio(led, 'out');
        }));
    }

    if (DRIVE_L293D_LEFT_ENABLE && DRIVE_L293D_RIGHT_ENABLE) {
      drives.push(new L293DDrive({
        left: {
          A: new Gpio(Number(DRIVE_L293D_LEFT_A), 'out'),
          B: new Gpio(Number(DRIVE_L293D_LEFT_B), 'out'),
          enable: new Gpio(Number(DRIVE_L293D_LEFT_ENABLE), 'out'),
        },
        right: {
          A: new Gpio(Number(DRIVE_L293D_RIGHT_A), 'out'),
          B: new Gpio(Number(DRIVE_L293D_RIGHT_B), 'out'),
          enable: new Gpio(Number(DRIVE_L293D_RIGHT_ENABLE), 'out'),
        }
      }))
    }

    const app = new App({
      mqtt: connect(BOT_URL),
      leds,
      drives,
    });

    app.start();
  } catch (error) {
    console.log(error);
  }
}

bootstrap();
