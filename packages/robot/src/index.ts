require('dotenv').config();
import "reflect-metadata";
import { connect } from "mqtt";
import { Gpio } from "onoff";
import { App } from "./App";

const {
  BOT_URL,
  LED_GPIO
} = process.env;

async function bootstrap() {
  try {
    const app = new App({
      mqtt: connect(BOT_URL),
      led: new Gpio(Number(LED_GPIO), 'out')
    });

    app.start();
  } catch (error) {
    console.log(error);
  }
}

bootstrap();
