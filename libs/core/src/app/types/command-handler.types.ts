import { Command } from './command.types';

export type CommandHandler<TCommand> =
  TCommand extends Command<infer R>
    ? {
        execute(query: TCommand): Promise<R>;
      }
    : never;
