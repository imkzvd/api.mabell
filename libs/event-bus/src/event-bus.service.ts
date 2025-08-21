import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { App } from '@api.mabell/core';

@Injectable()
export class EventBus implements App.Ports.EventBus {
  constructor(private readonly emitter: EventEmitter2) {}

  publish<T extends App.Ports.EventPayload>(event: App.Ports.Event<T>): void {
    this.emitter.emit(event.name, event);
  }

  subscribe<T extends App.Ports.Event<App.Ports.EventPayload>>(
    event: App.Ports.EventConstructor,
    handler: App.Ports.EventHandler<T>,
  ) {
    const eventInstance = new event({} as App.Ports.EventPayload);

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.emitter.on(eventInstance.name, handler.handle.bind(handler));
  }

  unsubscribe<T extends App.Ports.Event<App.Ports.EventPayload>>(
    event: App.Ports.EventConstructor,
    handler: App.Ports.EventHandler<T>,
  ) {
    const eventInstance = new event({} as App.Ports.EventPayload);

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.emitter.off(eventInstance.name, handler.handle.bind(handler));
  }
}
