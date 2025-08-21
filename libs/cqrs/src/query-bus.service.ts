import { QueryBus as NestQueryBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { ExtractQueryResponse } from './types';

@Injectable()
export class QueryBus {
  constructor(private readonly _QB: NestQueryBus) {}

  execute<T extends App.Types.Query<any>>(query: T): Promise<ExtractQueryResponse<T>> {
    return this._QB.execute(query);
  }
}
