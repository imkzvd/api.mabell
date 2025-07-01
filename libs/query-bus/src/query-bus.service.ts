import { QueryBus as NestQueryBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { Query } from '@core/app/types';

type ExtractQueryResponse<TQuery extends Query<any>> = TQuery extends Query<infer R> ? R : never;

@Injectable()
export class QueryBus {
  constructor(private readonly _QB: NestQueryBus) {}

  execute<T extends Query<any>>(query: T): Promise<ExtractQueryResponse<T>> {
    return this._QB.execute(query);
  }
}
