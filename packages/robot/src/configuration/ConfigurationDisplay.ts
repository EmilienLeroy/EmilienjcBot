import { Display, PCF8574Display } from "../screen";
const {
  DISPLAY_PCF8574_BUS,
  DISPLAY_PCF8574_ADDRESS,
  DISPLAY_PCF8574_WIDTH,
  DISPLAY_PCF8574_HEIGTH,
} = process.env;

export function configureDisplay(): Display[] {
  const displays = [];

  if (DISPLAY_PCF8574_BUS
    && DISPLAY_PCF8574_ADDRESS
    && DISPLAY_PCF8574_WIDTH
    && DISPLAY_PCF8574_HEIGTH) {
		displays.push(new PCF8574Display({
			bus: Number(DISPLAY_PCF8574_BUS),
			address: Number(DISPLAY_PCF8574_ADDRESS),
			width: Number(DISPLAY_PCF8574_WIDTH),
			heigth: Number(DISPLAY_PCF8574_HEIGTH),
		}))
  }

  return displays;
}