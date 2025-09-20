import * as process from 'process';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { App } from '@api.mabell/core';
import { AlbumRO } from '../../album/ros/album.ro';
import { SimplifiedArtistRO } from '../../artist/ros/simplified-artist.ro';

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
    type: () => AlbumRO,
    description: 'Album',
  })
  album: AlbumRO;

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

  @ApiProperty({ type: Number, description: 'Duration', example: 240, nullable: true })
  duration: number | null;

  @ApiProperty({ type: Number, description: 'Index', example: 0 })
  trackNumber: number;

  @ApiProperty({ description: 'Explicit', example: true })
  isExplicit: boolean;

  @ApiProperty({ description: 'Activation', example: true })
  isActive: boolean;

  constructor(dto: App.DTOs.TrackWithAlbumDTO) {
    this.id = dto.id;
    this.name = dto.name;
    this.album = new AlbumRO(dto.album);
    this.featArtists = dto.featArtists.map((i) => new SimplifiedArtistRO(i));
    this.file = dto.file && dto.isActive ? `${process.env.API_URL}${dto.file}` : null;
    this.duration = dto.duration;
    this.trackNumber = dto.trackNumber;
    this.isExplicit = dto.isExplicit;
    this.isActive =
      dto.isActive && dto.album.isActive && dto.album.artists.every(({ isActive }) => isActive);
  }
}
