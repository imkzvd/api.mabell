import { CommandBus as NestCommandBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { Command } from '@core/app/types';

type ExtractCommandResponse<TCommand extends Command<any>> =
  TCommand extends Command<infer R> ? R : never;

@Injectable()
export class CommandBus {
  constructor(private readonly _CB: NestCommandBus) {}

  execute<T extends Command<any>>(command: T): Promise<ExtractCommandResponse<T>> {
    return this._CB.execute(command);
  }
}
