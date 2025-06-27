import { Query } from '@types';

export type QueryHandler<TQuery> =
  TQuery extends Query<infer R>
    ? {
        execute(query: TQuery): Promise<R>;
      }
    : never;
