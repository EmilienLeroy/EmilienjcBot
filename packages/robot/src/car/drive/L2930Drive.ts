import { Gpio } from "onoff";
import Drive from "./Drive";

interface L2930Motor {
  A: Gpio;
  B: Gpio;
  enable: Gpio;
}

interface L2930DriveConstructor {
  motor1: L2930Motor;
  motor2: L2930Motor;
}

export default class L2930Drive implements Drive {
  private motors: L2930DriveConstructor;

  constructor(motors: L2930DriveConstructor) {
    this.motors = motors;
  }
    
  forward() {
    Object.values(this.motors).forEach((motor: L2930Motor) => {
      motor.A.writeSync(1);
      motor.B.writeSync(0);
      motor.enable.writeSync(1);
    });
  }

  backward() {

  }

  turnLeft() {

  }

  turnRight() {

  }

  stop() {
    Object.values(this.motors).forEach(({ enable }: L2930Motor) => {
      enable.writeSync(0);
    });
  }
}