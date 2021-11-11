import Display from './Display';
import LCD from 'raspberrypi-liquid-crystal';

interface PCF8574DisplayConstructor {
	bus: number;
	address: number;
	width: number;
	heigth: number;
}

export default class PCF8574Display implements Display {
	private lcd: LCD;

  constructor({
		bus,
		address,
		width,
		heigth,
	}: PCF8574DisplayConstructor) {
		this.lcd = new LCD(bus, address, width, heigth);
		this.lcd.beginSync();
	}

	public displayReady(): void {
		this.lcd.clearSync();
		this.lcd.printLineSync(0, 'Robot Ready !');
	}
	
	public displayCommand(command: string): void {
		this.lcd.clearSync();
		this.lcd.printLineSync(0, command);
	}
}