import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import {
  ALBUM_WRITE_REPOSITORY_DI_TOKEN,
  AlbumWriteRepository,
} from '../../../../../domain/components/album/repository/album-write-repository.port';
import { NotFoundException } from '../../../../../shared/exceptions';
import { CreateTrackCommand } from './create-track.command';
import {
  TRACK_WRITE_REPOSITORY_DI_TOKEN,
  TrackWriteRepository,
} from '../../../../../domain/components/track/repository/track-write-repository.port';
import { TrackFactory } from '../../../../../domain/components/track/track.factory';
import { ID_SERVICE_DI_TOKEN, IdService } from '../../../../common/services/id-service.port';
import { TrackId } from '../../../../../domain/components/track/track.entity';

@CommandHandler(CreateTrackCommand)
export class CreateTrackHandler implements ICommandHandler<CreateTrackCommand> {
  constructor(
    @Inject(ALBUM_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _albumWriteRepository: AlbumWriteRepository,
    @Inject(TRACK_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _trackWriteRepository: TrackWriteRepository,
    @Inject(ID_SERVICE_DI_TOKEN)
    private readonly _idService: IdService<TrackId>,
  ) {}

  async execute({ albumId, name }: CreateTrackCommand) {
    const foundAlbum = await this._albumWriteRepository.findById(albumId);

    if (!foundAlbum) {
      throw new NotFoundException('Album does not exist');
    }

    const generatedId = this._idService.generate();
    const nextAlbumTrackIndex = await this._trackWriteRepository.getNextAlbumTrackIndex(
      foundAlbum.getId(),
    );
    const createdTrack = TrackFactory.create({
      id: generatedId,
      name: name || `Track #${nextAlbumTrackIndex}`,
      album: foundAlbum.getId(),
      artists: foundAlbum.getArtists(),
      trackNumber: nextAlbumTrackIndex,
    });

    await this._trackWriteRepository.save(createdTrack);
    await this._albumWriteRepository.save(foundAlbum);

    return {
      id: createdTrack.getId(),
    };
  }
}
