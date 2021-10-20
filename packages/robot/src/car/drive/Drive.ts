export default interface Drive {
  forward(): void;
  backward(): void;
  turnRight(): void;
  turnLeft(): void;
  stop(): void;
}