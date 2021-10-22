import { Gpio } from "onoff";
import Drive from "./Drive";

interface L2930Motor {
  A: Gpio;
  B: Gpio;
  enable: Gpio;
}

interface L2930DriveConstructor {
  left: L2930Motor;
  right: L2930Motor;
}

export default class L2930Drive implements Drive {
  private motors: L2930DriveConstructor;

  constructor(motors: L2930DriveConstructor) {
    this.motors = motors;
  }

  private turnMotor(motor: L2930Motor  ,direction: 'clock' | 'unclock') {
    const a = direction === 'clock' ? 0 : 1;
    const b = direction === 'clock' ? 1 : 0;

    motor.A.writeSync(a);
    motor.B.writeSync(b);
    motor.enable.writeSync(1);
  }
    
  public forward() {
    Object.values(this.motors).forEach((motor: L2930Motor) => {
      this.turnMotor(motor, 'clock');
    });
  }

  public backward() {
    Object.values(this.motors).forEach((motor: L2930Motor) => {
      this.turnMotor(motor, 'unclock');
    });
  }

  public turnLeft() {
    this.turnMotor(this.motors.right, 'clock');
  }

  public turnRight() {
    this.turnMotor(this.motors.left, 'clock');
  }

  public stop() {
    Object.values(this.motors).forEach(({ enable }: L2930Motor) => {
      enable.writeSync(0);
    });
  }
}