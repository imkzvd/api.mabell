import { Command } from '@nestjs/cqrs';

export class UpdateTrackFileCommand extends Command<void> {
  constructor(
    public readonly id: string,
    public readonly payload: {
      fileId: string;
      duration: number;
    },
  ) {
    super();
  }
}
