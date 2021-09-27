import { Gpio } from "onoff";

interface LedServiceConstructor {
  gpio: Gpio;
}

export default class LedService {
  private gpio: Gpio;

  constructor({ gpio }: LedServiceConstructor) {
    this.gpio = gpio;
  }  

  public up() {
    this.gpio.writeSync(1);
  }

  public down() {
    this.gpio.writeSync(0);
  }
}