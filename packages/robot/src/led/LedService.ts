import { Gpio } from "onoff";
import { inject, singleton } from "tsyringe";

@singleton()
export default class LedService {
  private gpio: Gpio;

  constructor(@inject('led') led: Gpio) {
    this.gpio = led;
  }  

  public up() {
    this.gpio.writeSync(1);
  }

  public down() {
    this.gpio.writeSync(0);
  }
}