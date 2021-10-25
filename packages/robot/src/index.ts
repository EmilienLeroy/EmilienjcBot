require('dotenv').config();
import "reflect-metadata";
import { App } from "./App";

async function bootstrap() {
  try {
    const app = new App();

    app.start();
  } catch (error) {
    console.log(error);
  }
}

bootstrap();
