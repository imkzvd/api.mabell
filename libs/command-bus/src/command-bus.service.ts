import { CommandBus as NestCommandBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { ExtractCommandResponse } from './types';

@Injectable()
export class CommandBus {
  constructor(private readonly _CB: NestCommandBus) {}

  execute<T extends App.Types.Command<any>>(command: T): Promise<ExtractCommandResponse<T>> {
    return this._CB.execute(command);
  }
}
