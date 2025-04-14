import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetTrackQuery } from './get-track.query';
import {
  TRACK_READ_REPOSITORY_DI_TOKEN,
  TrackReadRepository,
} from '../../ports/repository/track-read-repository.port';

@QueryHandler(GetTrackQuery)
export class GetTrackHandler implements IQueryHandler<GetTrackQuery> {
  constructor(
    @Inject(TRACK_READ_REPOSITORY_DI_TOKEN)
    private readonly _trackReadRepository: TrackReadRepository,
  ) {}

  async execute({ id }: GetTrackQuery) {
    return this._trackReadRepository.findById(id);
  }
}
