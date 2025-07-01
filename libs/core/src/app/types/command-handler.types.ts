import { Command } from '@core/app/types/command.types';

export type CommandHandler<TCommand> =
  TCommand extends Command<infer R>
    ? {
        execute(query: TCommand): Promise<R>;
      }
    : never;
