import { EventEmitter } from 'eventemitter3';
import {
  Event,
  EventBus as EventBusPort,
  EventConstructor,
  EventHandler,
  EventPayload,
} from '../../../src/core/app/common/ports/event-bus.port';

export class EventBus implements EventBusPort {
  private readonly emitter: EventEmitter;

  constructor() {
    this.emitter = new EventEmitter();
  }

  publish<T extends EventPayload>(event: Event<T>): void {
    this.emitter.emit(event.name, event.payload);
  }

  subscribe<T extends EventPayload>(
    eventClass: EventConstructor<T>,
    callback: EventHandler<T>,
  ): void {
    const eventInstance = new eventClass({} as T);

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.emitter.on(eventInstance.name, callback);
  }

  unsubscribe<T extends EventPayload>(
    eventClass: EventConstructor<T>,
    callback: EventHandler<T>,
  ): void {
    const eventInstance = new eventClass({} as T);

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.emitter.off(eventInstance.name, callback);
  }
}
