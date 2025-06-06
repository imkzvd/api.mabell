import * as process from 'process';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IndexedTrackDTO } from '../../../../../../core/app/components/search/ports/search-service/dtos/indexed-track.dto';
import { LabelValueRO } from '../../../../common/ros/label-value.ro';
import { getAlbumTypeLabelByValue } from '../../../../../../core/domain/components/album/constants/album-types';

export class IndexedTrackRO {
  @ApiProperty({ description: 'Id', example: faker.database.mongodbObjectId() })
  id: string;

  @ApiProperty({ description: 'Name', example: faker.person.firstName() })
  name: string;

  @ApiProperty({
    description: 'Artists of the album',
    example: [
      {
        id: faker.database.mongodbObjectId(),
        name: faker.person.firstName(),
        type: '',
        releaseAt: faker.date.past().toISOString(),
      },
    ],
  })
  album: { id: string; name: string; type: LabelValueRO; releaseAt: Date | null };

  @ApiProperty({
    description: 'Artists of the album',
    example: [{ id: faker.database.mongodbObjectId(), name: faker.person.firstName() }],
  })
  artists: { id: string; name: string }[];

  @ApiProperty({
    description: 'Artists of the album',
    example: [{ id: faker.database.mongodbObjectId(), name: faker.person.firstName() }],
  })
  featuredArtists: { id: string; name: string }[];

  @ApiProperty({
    type: String,
    description: 'Cover',
    example: faker.image.url(),
    nullable: true,
  })
  cover: string | null;

  @ApiProperty({ type: String, description: 'Url', example: faker.internet.url(), nullable: true })
  file: string | null;

  @ApiProperty({ description: 'Duration', example: 240, nullable: true })
  duration: number | null;

  @ApiProperty({ description: 'Explicit', example: true })
  isExplicit: boolean;

  @ApiProperty({ description: 'Public', example: true })
  isPublic: boolean;

  constructor(dto: IndexedTrackDTO) {
    this.id = dto.id;
    this.name = dto.name;
    this.album = {
      id: dto.album.id,
      name: dto.album.name,
      type: new LabelValueRO(dto.album.type, getAlbumTypeLabelByValue(dto.album.type)),
      releaseAt: dto.album.releaseAt,
    };
    this.artists = dto.artists;
    this.featuredArtists = dto.featuredArtists;
    this.cover = dto.cover ? `${process.env.HOST}${dto.cover}` : null;
    this.file = dto.file ? `${process.env.HOST}${dto.file}` : null;
    this.duration = dto.duration;
    this.isExplicit = dto.isExplicit;
    this.isPublic = dto.isPublic;
  }
}
