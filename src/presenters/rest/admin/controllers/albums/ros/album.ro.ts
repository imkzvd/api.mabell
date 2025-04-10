import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import * as process from 'process';
import { LabelValueRO } from '../../../../common/ros/label-value.ro';
import { AlbumDTO } from '../../../../../../core/app/components/album/dtos/album.dto';
import { ArtistRO } from '../../artists/ros/artist.ro';
import {
  Genres,
  getGenreLabelByValue,
} from '../../../../../../core/domain/common/constants/genres';
import {
  AlbumTypes,
  getAlbumTypeLabelByValue,
} from '../../../../../../core/domain/components/album/constants/album-types';

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

  @ApiProperty({
    type: [String],
    description: 'Ids of artists',
    example: [faker.database.mongodbObjectId()],
  })
  artistIds: string[];

  @ApiProperty({ type: () => [ArtistRO], description: 'Artists' })
  artists: ArtistRO[];

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

  // @ApiProperty({ type: () => [], description: 'Album tracks' })
  tracks: [];

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

  constructor(dto: AlbumDTO) {
    this.id = dto.id;
    this.name = dto.name;
    this.artistIds = dto.artistIds;
    this.artists = dto.artists.map((i) => new ArtistRO(i));
    this.type = new LabelValueRO(dto.type, getAlbumTypeLabelByValue(dto.type));
    this.genres = dto.genres.map((genre) => new LabelValueRO(genre, getGenreLabelByValue(genre)));
    this.cover = dto.cover ? `${process.env.HOST}${dto.cover}` : null;
    this.color = dto.color;
    this.description = dto.description;
    this.releaseAt = dto.releaseAt;
    this.tracks = [];
    this.isActive = dto.isActive;
    this.isPublic = dto.isPublic;
    this.createdAt = dto.createdAt;
    this.updatedAt = dto.updatedAt;
  }
}
