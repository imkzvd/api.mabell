import * as process from 'process';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { TrackDTO } from '@core/app/components/track/dtos/track.dto';
import { AlbumRO } from '../../album/ros/album.ro';
import { ArtistRO } from '../../artist/ros/artist.ro';

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
    type: () => AlbumRO,
    description: 'Album',
  })
  album: AlbumRO;

  @ApiProperty({
    type: [String],
    description: 'Ids of artist',
    example: [faker.database.mongodbObjectId()],
  })
  artistIds: string[];

  @ApiProperty({
    type: () => [ArtistRO],
    description: 'Primary artist',
  })
  artists: ArtistRO[];

  @ApiProperty({
    type: [String],
    description: 'Ids of featured artist',
    example: [faker.database.mongodbObjectId()],
  })
  featArtistIds: string[];

  @ApiProperty({
    type: () => [ArtistRO],
    description: 'Featured artist',
  })
  featArtists: ArtistRO[];

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
    this.album = new AlbumRO(dto.album);
    this.artists = dto.artists.map((i) => new ArtistRO(i));
    this.artistIds = dto.artists.map(({ id }) => id);
    this.featArtists = dto.featArtists.map((i) => new ArtistRO(i));
    this.featArtistIds = dto.featArtists.map(({ id }) => id);
    this.file = dto.file ? `${process.env.API_URL}${dto.file}` : null;
    this.duration = dto.duration;
    this.trackNumber = dto.trackNumber;
    this.isExplicit = dto.isExplicit;
    this.isActive = dto.isActive;
    this.isPublic = dto.isPublic;
    this.createdAt = dto.createdAt;
    this.updatedAt = dto.updatedAt;
  }
}
