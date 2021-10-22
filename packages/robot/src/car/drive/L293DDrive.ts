import { Gpio } from "onoff";
import Drive from "./Drive";

interface L293DMotor {
  A: Gpio;
  B: Gpio;
  enable: Gpio;
}

interface L293DDriveConstructor {
  left: L293DMotor;
  right: L293DMotor;
}

export default class L2930Drive implements Drive {
  private motors: L293DDriveConstructor;

  constructor(motors: L293DDriveConstructor) {
    this.motors = motors;
  }

  private turnMotor(motor: L293DMotor  ,direction: 'clock' | 'unclock') {
    const a = direction === 'clock' ? 0 : 1;
    const b = direction === 'clock' ? 1 : 0;

    motor.A.writeSync(a);
    motor.B.writeSync(b);
    motor.enable.writeSync(1);
  }
    
  public forward() {
    Object.values(this.motors).forEach((motor: L293DMotor) => {
      this.turnMotor(motor, 'clock');
    });
  }

  public backward() {
    Object.values(this.motors).forEach((motor: L293DMotor) => {
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
    Object.values(this.motors).forEach(({ enable }: L293DMotor) => {
      enable.writeSync(0);
    });
  }
}