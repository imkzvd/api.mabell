import * as process from 'process';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { App } from '@api.mabell/core';
import { SimplifiedArtistRO } from '../../artist/ros/simplified-artist.ro';
import { LabelValueRO } from '@api.mabell/shared';
import { SimplifiedAlbumRO } from '../../album/ros/simplified-album.ro';

export class TrackRO {
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

  @ApiProperty({
    type: () => SimplifiedAlbumRO,
    description: 'Album',
  })
  album: SimplifiedAlbumRO;

  @ApiProperty({
    type: () => [SimplifiedArtistRO],
    description: 'Artist',
  })
  artists: SimplifiedArtistRO[];

  @ApiProperty({
    type: () => [SimplifiedArtistRO],
    description: 'Featured artist',
  })
  featArtists: SimplifiedArtistRO[];

  @ApiProperty({
    type: String,
    description: 'Url',
    example: faker.internet.url(),
    nullable: true,
  })
  file: string | null;

  @ApiProperty({
    type: String,
    description: 'Cover',
    example: faker.image.url(),
    nullable: true,
  })
  cover: string | null;

  @ApiProperty({ type: () => LabelValueRO, description: 'Type' })
  type: LabelValueRO;

  @ApiProperty({ type: Number, description: 'Duration', example: 240, nullable: true })
  duration: number | null;

  @ApiProperty({ type: Number, description: 'Index', example: 0 })
  trackNumber: number;

  @ApiProperty({ description: 'Explicit', example: true })
  isExplicit: boolean;

  @ApiProperty({ description: 'Activation', example: true })
  isActive: boolean;

  @ApiProperty({
    type: Date,
    description: 'Release date',
    example: faker.date.past().toISOString(),
    nullable: true,
  })
  releaseAt: Date | null;

  constructor(dto: App.DTOs.TrackWithAlbumDTO) {
    this.id = dto.id;
    this.name = dto.name;
    this.album = new SimplifiedAlbumRO(dto.album);
    this.artists = dto.album.artists.map((i) => new SimplifiedArtistRO(i));
    this.featArtists = dto.featArtists.map((i) => new SimplifiedArtistRO(i));
    this.file = dto.file && dto.isActive ? `${process.env.CLIENT_API_URL}${dto.file}` : null;
    this.cover = dto.album.cover ? `${process.env.CLIENT_API_URL}${dto.album.cover}` : null;
    this.type = new LabelValueRO(dto.album.typeLabelValue);
    this.duration = dto.duration;
    this.trackNumber = dto.trackNumber;
    this.isExplicit = dto.isExplicit;
    this.releaseAt = dto.album.releaseAt;
    this.isActive =
      dto.isActive && dto.album.isActive && dto.album.artists.every(({ isActive }) => isActive);
  }
}
