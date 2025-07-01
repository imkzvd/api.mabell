import * as process from 'process';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IndexedPlaylistDTO } from '../../../../../../core/app/components/search/ports/search-service/dtos/indexed-playlist.dto';

export class IndexedPlaylistRO {
  @ApiProperty({ description: 'Id', example: faker.database.mongodbObjectId() })
  id: string;

  @ApiProperty({ description: 'Name', example: faker.person.firstName() })
  name: string;

  @ApiProperty({
    type: String,
    description: 'Cover',
    example: faker.image.url(),
    nullable: true,
  })
  cover: string | null;

  @ApiProperty({ type: Boolean, description: 'Public', example: true })
  isPublic: boolean;

  constructor(dto: IndexedPlaylistDTO) {
    this.id = dto.id;
    this.name = dto.name;
    this.cover = dto.cover ? `${process.env.HOST}${dto.cover}` : null;
    this.isPublic = dto.isPublic;
  }
}
