import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { TrackRO } from './track.ro';
import { PlaylistTrackDTO } from '@core/app/components/track/dtos/playlist-track.dto';

export class PlaylistTrackRO {
  @ApiProperty({
    type: () => TrackRO,
    description: 'Track',
    nullable: true,
  })
  track: TrackRO | null;

  @ApiProperty({
    description: 'Added date',
    example: faker.date.past().toISOString(),
  })
  addedAt: Date;

  constructor(dto: PlaylistTrackDTO) {
    this.track = dto.track ? new TrackRO(dto.track) : null;
    this.addedAt = dto.addedAt;
  }
}
