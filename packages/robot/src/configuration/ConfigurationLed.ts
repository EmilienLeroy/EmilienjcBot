import { Gpio } from "onoff";
const { LED_GPIO } = process.env;

export function configureLed() {
  let ledsParse: Gpio[] = [];
  
  if (typeof LED_GPIO === 'string') {
    ledsParse = LED_GPIO.split(',')
      .map((l) => {
        const led = Number(l.trim().replace('[', '').replace(']', ''))

        return new Gpio(led, 'out');
      });
  }

  if (Array.isArray(LED_GPIO)) {
    ledsParse = LED_GPIO.map((led) => {
      if (typeof led === 'number') {
        return new Gpio(led, 'out');
      }
    }).filter(x => !!x) as Gpio[];
  } 

  return ledsParse;
}