import { Gpio } from "onoff";
import { Drive, L293DDrive } from "../car";

const {
  DRIVE_L293D_LEFT_A,
  DRIVE_L293D_LEFT_B,
  DRIVE_L293D_LEFT_ENABLE,
  DRIVE_L293D_RIGHT_A,
  DRIVE_L293D_RIGHT_B,
  DRIVE_L293D_RIGHT_ENABLE,
} = process.env;

export function configureDrive(): Drive[] {
  const drives = [];

  if (DRIVE_L293D_LEFT_A 
    && DRIVE_L293D_LEFT_B 
    && DRIVE_L293D_LEFT_ENABLE
    && DRIVE_L293D_RIGHT_A
    && DRIVE_L293D_RIGHT_B
    && DRIVE_L293D_RIGHT_ENABLE) {
    drives.push(new L293DDrive({
      left: {
        A: new Gpio(Number(DRIVE_L293D_LEFT_A), 'out'),
        B: new Gpio(Number(DRIVE_L293D_LEFT_B), 'out'),
        enable: new Gpio(Number(DRIVE_L293D_LEFT_ENABLE), 'out'),
      },
      right: {
        A: new Gpio(Number(DRIVE_L293D_RIGHT_A), 'out'),
        B: new Gpio(Number(DRIVE_L293D_RIGHT_B), 'out'),
        enable: new Gpio(Number(DRIVE_L293D_RIGHT_ENABLE), 'out'),
      }
    }))
  }

  return drives;
}