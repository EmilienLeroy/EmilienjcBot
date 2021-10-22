import { container, injectAll, singleton } from "tsyringe";
import { Drive } from "./drive";

@singleton()
export class CarService {
  private drives?: Drive[];

  constructor() {
    try {
      this.drives = container.resolveAll('drive');

      // @TODO: Register commands /car
    } catch (error) {
      console.warn('No drive configured, the car will not forward ')
    }
  }
}