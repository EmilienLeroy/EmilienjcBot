export default interface Display {
  displayCommand(command: string): void;
  displayReady(): void;
}