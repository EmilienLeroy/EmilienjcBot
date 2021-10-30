
export interface Command<T, S> {
  name: string;
  exec: <T, S>(subscriber: string, payload: T, message: S) => Promise<void>;
}

export interface QueuedCommand<T, S> {
  command: Command<T, S>;
  params: {
    subscriber: string, 
    payload: T, 
    message: S,
  }
}