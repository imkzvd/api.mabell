import * as process from 'process';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IndexedAlbumDTO } from '../../../../../../core/app/components/search/ports/search-service/dtos/indexed-album.dto';
import { LabelValueRO } from '../../../../common/ros/label-value.ro';
import {
  AlbumTypes,
  getAlbumTypeLabelByValue,
} from '../../../../../../core/domain/components/album/constants/album-types';
import { IndexedSimplifiedArtistRO } from './indexed-simplified-artist.ro';

export class IndexedAlbumRO {
  @ApiProperty({ description: 'Id', example: faker.database.mongodbObjectId() })
  id: string;

  @ApiProperty({ description: 'Name', example: faker.person.firstName() })
  name: string;

  @ApiProperty({
    description: 'Artists of the album',
    type: () => [IndexedSimplifiedArtistRO],
  })
  artists: IndexedSimplifiedArtistRO[];

  @ApiProperty({
    type: () => LabelValueRO,
    description: 'Type',
    example: new LabelValueRO(AlbumTypes['Album'], getAlbumTypeLabelByValue(AlbumTypes['Album'])),
  })
  type: LabelValueRO;

  @ApiProperty({
    type: String,
    description: 'Cover',
    example: faker.image.url(),
    nullable: true,
  })
  cover: string | null;

  constructor(dto: IndexedAlbumDTO) {
    this.id = dto.id;
    this.name = dto.name;
    this.artists = dto.artists.map((i) => new IndexedSimplifiedArtistRO(i));
    this.type = new LabelValueRO(dto.type, getAlbumTypeLabelByValue(dto.type));
    this.cover = dto.cover ? `${process.env.HOST}${dto.cover}` : null;
  }
}
