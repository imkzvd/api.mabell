import { Command } from '@nestjs/cqrs';
import { Genre } from '../../../../../domain/common/constants/genres';

export class UpdatePlaylistCommand extends Command<void> {
  constructor(
    public readonly id: string,
    public readonly payload: Partial<{
      name: string;
      genres: Genre[];
      description: string;
      isPublic: boolean;
    }>,
  ) {
    super();
  }
}
