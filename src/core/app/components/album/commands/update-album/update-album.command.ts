import { Command } from '@nestjs/cqrs';
import { Genre } from '../../../../../domain/common/constants/genres';
import { AlbumType } from '../../../../../domain/components/album/constants/album-types';

export class UpdateAlbumCommand extends Command<void> {
  constructor(
    public readonly id: string,
    public readonly payload: Partial<{
      name: string;
      type: AlbumType;
      genres: Genre[];
      description: string;
      releaseAt: Date | null;
      isActive: boolean;
      isPublic: boolean;
    }>,
  ) {
    super();
  }
}
