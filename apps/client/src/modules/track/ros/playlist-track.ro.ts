import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { App } from '@api.mabell/core';
import { TrackRO } from './track.ro';

export class PlaylistTrackRO {
  @ApiProperty({ type: () => TrackRO, description: 'Track' })
  track: TrackRO;

  @ApiProperty({
    description: 'Added date',
    example: faker.date.past().toISOString(),
  })
  addedAt: Date;

  constructor(track: App.DTOs.TrackWithAlbumDTO, addedAt: Date) {
    this.track = new TrackRO(track);
    this.addedAt = addedAt;
  }
}
