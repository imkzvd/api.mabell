export type EventPayload = Record<string, unknown>;

export abstract class Event<T extends EventPayload> {
  public abstract readonly name: string;
  public abstract readonly payload: T;
  public readonly createdAt: Date = new Date();
}

export abstract class EventHandler<TEvent extends Event<EventPayload>> {
  abstract handle(event: TEvent): Promise<void> | void;
}

export interface EventConstructor {
  new (payload: EventPayload): Event<EventPayload>;
}

export interface EventBus {
  publish<T extends EventPayload>(event: Event<T>): void;

  subscribe<T extends Event<EventPayload>>(event: EventConstructor, handler: EventHandler<T>): void;

  unsubscribe<T extends Event<EventPayload>>(
    event: EventConstructor,
    handler: EventHandler<T>,
  ): void;
}
