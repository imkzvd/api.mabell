import { CommandBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { ExtractCommandResponse } from './types';

@Injectable()
export class CommandBusService {
  constructor(private readonly _CB: CommandBus) {}

  execute<T extends App.Types.Command<any>>(command: T): Promise<ExtractCommandResponse<T>> {
    return this._CB.execute(command);
  }
}
