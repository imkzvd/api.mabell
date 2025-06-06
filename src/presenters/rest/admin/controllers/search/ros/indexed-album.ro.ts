import * as process from 'process';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IndexedAlbumDTO } from '../../../../../../core/app/components/search/ports/search-service/dtos/indexed-album.dto';

export class IndexedAlbumRO {
  @ApiProperty({ description: 'Id', example: faker.database.mongodbObjectId() })
  id: string;

  @ApiProperty({ description: 'Name', example: faker.person.firstName() })
  name: string;

  @ApiProperty({
    description: 'Artists of the album',
    example: [{ id: faker.database.mongodbObjectId(), name: faker.person.firstName() }],
  })
  artists: { id: string; name: string }[];

  @ApiProperty({
    type: String,
    description: 'Cover',
    example: faker.image.url(),
    nullable: true,
  })
  cover: string | null;

  @ApiProperty({ type: Boolean, description: 'Public', example: true })
  isPublic: boolean;

  @ApiProperty({
    type: Date,
    description: 'Release date',
    example: faker.date.past().toISOString(),
    nullable: true,
  })
  releaseAt: Date | null;

  constructor(dto: IndexedAlbumDTO) {
    this.id = dto.id;
    this.name = dto.name;
    this.artists = dto.artists;
    this.cover = dto.cover ? `${process.env.HOST}${dto.cover}` : null;
    this.isPublic = dto.isPublic;
    this.releaseAt = dto.releaseAt;
  }
}
