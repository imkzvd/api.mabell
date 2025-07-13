import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import * as process from 'process';
import { LabelValueRO } from '@shared/ros/label-value.ro';
import {
  AlbumTypes,
  getAlbumTypeLabelByValue,
} from '@core/domain/components/album/constants/album-types';
import { Genres, getGenreLabelByValue } from '@core/domain/common/constants/genres';
import { AlbumDTO } from '@core/app/components/album/dtos/album.dto';
import { ArtistRO } from '../../artist/ros/artist.ro';

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

  @ApiProperty({ type: () => [ArtistRO], description: 'Artists' })
  artists: ArtistRO[];

  @ApiProperty({
    type: [String],
    description: 'Artist ids',
    example: [faker.database.mongodbObjectId()],
  })
  artistIds: string[];

  @ApiProperty({
    type: () => LabelValueRO,
    description: 'Type',
    example: new LabelValueRO(AlbumTypes['Album'], getAlbumTypeLabelByValue(AlbumTypes['Album'])),
  })
  type: LabelValueRO;

  @ApiProperty({
    type: () => [LabelValueRO],
    description: 'Genres',
    example: new LabelValueRO(Genres['Hip-Hop'], getGenreLabelByValue(Genres['Hip-Hop'])),
  })
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

  constructor(album: AlbumDTO) {
    this.id = album.id;
    this.name = album.name;
    this.artists = album.artists.map((i) => new ArtistRO(i));
    this.artistIds = album.artists.map(({ id }) => id);
    this.type = new LabelValueRO(album.type, getAlbumTypeLabelByValue(album.type));
    this.genres = album.genres.map((genre) => new LabelValueRO(genre, getGenreLabelByValue(genre)));
    this.cover = album.cover ? `${process.env.API_URL}${album.cover}` : null;
    this.color = album.color;
    this.description = album.description;
    this.releaseAt = album.releaseAt;
    this.isActive = album.isActive;
    this.isPublic = album.isPublic;
    this.createdAt = album.createdAt;
    this.updatedAt = album.updatedAt;
  }
}
