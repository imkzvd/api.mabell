import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import * as process from 'process';
import { App } from '@api.mabell/core';
import { LabelValueRO } from '@api.mabell/shared';
import { SimplifiedArtistRO } from '../../artist/ros/simplified-artist.ro';

export class AlbumRO {
  @ApiProperty({
    type: String,
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  id: string;

  @ApiProperty({
    type: String,
    description: 'Name',
    example: faker.music.songName(),
  })
  name: string;

  @ApiProperty({ type: () => [SimplifiedArtistRO], description: 'Artists' })
  artists: SimplifiedArtistRO[];

  @ApiProperty({ type: () => LabelValueRO, description: 'Type' })
  type: LabelValueRO;

  @ApiProperty({ type: () => [LabelValueRO], description: 'Genres' })
  genres: LabelValueRO[];

  @ApiProperty({
    type: String,
    description: 'Cover',
    example: faker.image.url(),
    nullable: true,
  })
  cover: string | null;

  @ApiProperty({
    type: String,
    description: 'Accent color',
    example: faker.color.rgb(),
    nullable: true,
  })
  color: string | null;

  @ApiProperty({
    type: String,
    description: 'Description',
    example: faker.lorem.text(),
  })
  description: string;

  @ApiProperty({
    type: Date,
    description: 'Release date',
    example: faker.date.past().toISOString(),
    nullable: true,
  })
  releaseAt: Date | null;

  // @ApiProperty({ type: () => OffsetLimitPaginationRO<TrackRO>, description: 'Album tracks' })
  // tracks: OffsetLimitPaginationRO<TrackRO>;

  @ApiProperty({ type: Boolean, description: 'Active', example: true })
  isActive: boolean;

  @ApiProperty({ type: Boolean, description: 'Public', example: true })
  isPublic: boolean;

  @ApiProperty({
    type: Date,
    description: 'Created date',
    example: faker.date.past().toISOString(),
  })
  createdAt: Date;

  @ApiProperty({
    type: Date,
    description: 'Updated date',
    example: faker.date.past().toISOString(),
  })
  updatedAt: Date;

  constructor(album: App.DTOs.AlbumDTO) {
    this.id = album.id;
    this.name = album.name;
    this.artists = album.artists.map((i) => new SimplifiedArtistRO(i));
    this.type = new LabelValueRO(album.typeLabelValue);
    this.genres = album.genreLabelValues.map((i) => new LabelValueRO(i));
    this.cover = album.cover ? `${process.env.HOST}${album.cover}` : null;
    this.color = album.color;
    this.description = album.description;
    this.releaseAt = album.releaseAt;
    // this.tracks = tracks ? new TracksRO(tracks) : new OffsetLimitPaginationRO();
    this.isActive = album.isActive;
    this.isPublic = album.isPublic;
    this.createdAt = album.createdAt;
    this.updatedAt = album.updatedAt;
  }
}
