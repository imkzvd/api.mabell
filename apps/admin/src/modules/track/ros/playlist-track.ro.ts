import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { App } from '@api.mabell/core';
import { TrackRO } from './track.ro';

export class PlaylistTrackRO {
  @ApiProperty({
    type: () => TrackRO,
    description: 'Track',
    nullable: true,
  })
  track: TrackRO | null;

  @ApiProperty({
    type: String,
    description: 'Track Id',
  })
  trackId: string;

  @ApiProperty({
    description: 'Added date',
    example: faker.date.past().toISOString(),
  })
  addedAt: Date;

  constructor(dto: App.DTOs.PlaylistTrackDTO) {
    this.track = dto.track ? new TrackRO(dto.track) : null;
    this.trackId = dto.trackId;
    this.addedAt = dto.addedAt;
  }
}
