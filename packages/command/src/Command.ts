export interface Command {
  name: string;
  exec: <T = any, S = any>(subscriber: string, payload: T, message: S) => Promise<void>;
}