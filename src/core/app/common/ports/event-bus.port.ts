export const EVENT_BUS_DI_TOKEN = Symbol('EVENT_BUS_DI_TOKEN');

export interface Event<T extends EventPayload = EventPayload> {
  readonly name: string;
  readonly payload: T;
}

export type EventPayload = Record<string, unknown>;

export type EventHandler<T extends EventPayload> = (payload: T) => Promise<void> | void;

export interface EventConstructor<T extends EventPayload> {
  new (payload: T): Event<T>;
}

export interface EventBus {
  publish<T extends EventPayload>(event: Event<T>): void;

  subscribe<T extends EventPayload>(event: EventConstructor<T>, handler: EventHandler<T>): void;

  unsubscribe<T extends EventPayload>(event: EventConstructor<T>, handler: EventHandler<T>): void;
}
