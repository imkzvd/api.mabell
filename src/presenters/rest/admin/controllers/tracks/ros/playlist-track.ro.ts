import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { TrackRO } from './track.ro';
import { PlaylistTrackDTO } from '../../../../../../core/app/components/track/queries/dtos/playlist-track.dto';

export class PlaylistTrackRO {
  @ApiProperty({
    type: () => TrackRO,
    description: 'Track',
  })
  track: TrackRO;

  @ApiProperty({
    description: 'Added date',
    example: faker.date.past().toISOString(),
  })
  addedAt: Date;

  constructor(dto: PlaylistTrackDTO) {
    this.track = new TrackRO(dto.track);
    this.addedAt = dto.addedAt;
  }
}
