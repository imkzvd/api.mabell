import * as process from 'process';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IndexedArtistDTO } from '@core/app/common/ports/search-service/dtos/indexed-artist.dto';

export class IndexedArtistRO {
  @ApiProperty({ description: 'Id', example: faker.database.mongodbObjectId() })
  id: string;

  @ApiProperty({ description: 'Name', example: faker.person.firstName() })
  name: string;

  @ApiProperty({
    type: String,
    description: 'Avatar',
    example: faker.image.url(),
    nullable: true,
  })
  avatar: string | null;

  constructor(dto: IndexedArtistDTO) {
    this.id = dto.id;
    this.name = dto.name;
    this.avatar = dto.avatar ? `${process.env.HOST}${dto.avatar}` : null;
  }
}
