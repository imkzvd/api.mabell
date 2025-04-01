import { Command } from '@nestjs/cqrs';
import { Region } from '../../../../../domain/common/constants/regions';
import { Genre } from '../../../../../domain/common/constants/genres';

export class UpdateUserCommand extends Command<void> {
  constructor(
    public readonly id: string,
    public readonly payload: Partial<{
      name: string;
      birthDate: Date;
      region: Region;
      genres: Genre[];
      isPremium: boolean;
      isBlocked: boolean;
      isPublic: boolean;
    }>,
  ) {
    super();
  }
}
