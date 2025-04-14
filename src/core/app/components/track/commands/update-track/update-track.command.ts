import { Command } from '@nestjs/cqrs';

export class UpdateTrackCommand extends Command<void> {
  constructor(
    public readonly id: string,
    public readonly payload: Partial<{
      name: string;
      isExplicit: boolean;
      isActive: boolean;
      isPublic: boolean;
    }>,
  ) {
    super();
  }
}
