import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import * as process from 'process';
import { TrackDTO } from '../../../../../../core/app/components/track/dtos/track.dto';
import { SimplifiedAlbumRO } from '../../albums/ros/simplified-album.ro';
import { SimplifiedArtistRO } from '../../artists/ros/simplified-artist.ro';

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
    type: String,
    description: 'Album id',
    example: faker.database.mongodbObjectId(),
  })
  albumId: string;

  @ApiProperty({
    // type: () => SimplifiedAlbumRO,
    description: 'Album',
  })
  album: SimplifiedAlbumRO;

  @ApiProperty({
    type: [String],
    description: 'Ids of artists',
    example: [faker.database.mongodbObjectId()],
  })
  artistIds: string[];

  @ApiProperty({
    type: () => [SimplifiedArtistRO],
    description: 'Primary artists',
  })
  artists: SimplifiedArtistRO[];

  @ApiProperty({
    type: [String],
    description: 'Ids of featured artists',
    example: [faker.database.mongodbObjectId()],
  })
  featArtistIds: string[];

  @ApiProperty({
    type: () => [SimplifiedArtistRO],
    description: 'Featured artists',
  })
  featArtists: SimplifiedArtistRO[];

  @ApiProperty({
    type: String,
    description: 'Url',
    example: faker.internet.url(),
    nullable: true,
  })
  file: string | null;

  @ApiProperty({ description: 'Duration', example: 240, nullable: true })
  duration: number | null;

  @ApiProperty({ description: 'Explicit', example: true })
  isExplicit: boolean;

  @ApiProperty({ description: 'Activation', example: true })
  isActive: boolean;

  @ApiProperty({ description: 'Public', example: true })
  isPublic: boolean;

  @ApiProperty({
    description: 'Created date',
    example: faker.date.past().toISOString(),
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Updated date',
    example: faker.date.past().toISOString(),
  })
  updatedAt: Date;

  constructor(dto: TrackDTO) {
    this.id = dto.id;
    this.name = dto.name;
    this.albumId = dto.albumId;
    this.album = new SimplifiedAlbumRO(dto.album);
    this.artistIds = dto.artistIds;
    this.artists = dto.artists.map((i) => new SimplifiedArtistRO(i));
    this.featArtistIds = dto.featArtistIds;
    this.featArtists = dto.featArtists.map((i) => new SimplifiedArtistRO(i));
    this.file = dto.file ? `${process.env.HOST}${dto.file}` : null;
    this.duration = dto.duration;
    this.isExplicit = dto.isExplicit;
    this.isActive = dto.isActive;
    this.isPublic = dto.isPublic;
    this.createdAt = dto.createdAt;
    this.updatedAt = dto.updatedAt;
  }
}
