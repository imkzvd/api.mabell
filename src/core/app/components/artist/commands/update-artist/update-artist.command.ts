import { Command } from '@nestjs/cqrs';
import { Genre } from '../../../../../domain/common/constants/genres';

export class UpdateArtistCommand extends Command<void> {
  constructor(
    public readonly id: string,
    public readonly payload: Partial<{
      name: string;
      birthName: string | null;
      birthDate: Date | null;
      genres: Genre[];
      biography: string;
      isActive: boolean;
      isPublic: boolean;
    }>,
  ) {
    super();
  }
}
