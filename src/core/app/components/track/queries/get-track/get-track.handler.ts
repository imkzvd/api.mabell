import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetTrackQuery } from './get-track.query';
import {
  TRACK_READ_REPOSITORY_DI_TOKEN,
  TrackReadRepository,
} from '../../ports/repository/track-read-repository.port';
import TrackMapper from '../dtos/track.mapper';

@QueryHandler(GetTrackQuery)
export class GetTrackHandler implements IQueryHandler<GetTrackQuery> {
  constructor(
    @Inject(TRACK_READ_REPOSITORY_DI_TOKEN)
    private readonly _trackReadRepository: TrackReadRepository,
  ) {}

  async execute({ id, isPublic }: GetTrackQuery) {
    const foundTrack = await this._trackReadRepository.findById(id, {
      isPublic,
    });

    return foundTrack ? TrackMapper.toDTO(foundTrack) : null;
  }
}
