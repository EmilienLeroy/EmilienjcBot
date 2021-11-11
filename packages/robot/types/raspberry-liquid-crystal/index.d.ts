declare module 'raspberrypi-liquid-crystal' {
  export default class LCD {
    constructor(bus: number, address: number, width: number, heigth: number)
    beginSync(): void;
    clearSync(): void;
    homeSync(): void;
    setCursorSync(col: number, row: number): void;
    printSync(text: string): void;
    printLineSync(line: number, text: string): void;
	cursorSync(): void;
	noCursorSync(): void;
	blinkSync(): void;
	noBlinkSync(): void;
	displaySync(): void;
	noDisplaySync(): void;
	scrollDisplayLeftSync(): void;
	scrollDisplayRightSync(): void;
	leftToRightSync(): void;
	rightToLeftSync(): void;
  }
}