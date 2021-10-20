import { container, injectAll, singleton } from "tsyringe";
import { Drive } from "./drive";

@singleton()
export class CarService {
  private drives?: Drive[];

  constructor() {
    try {
      this.drives = container.resolveAll('drive');

      // @TODO: Register commands /car
      this.drives.forEach((drive) => drive.forward());
      setTimeout(() => {
        this.drives!.forEach((drive) => drive.stop());
      }, 5000);
    } catch (error) {
      console.warn('No drive configured, the car will not forward ')
    }
  }
}