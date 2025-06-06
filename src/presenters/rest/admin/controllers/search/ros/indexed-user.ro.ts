import * as process from 'process';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IndexedUserDTO } from '../../../../../../core/app/components/search/ports/search-service/dtos/indexed-user.dto';

export class IndexedUserRO {
  @ApiProperty({ description: 'Id', example: faker.database.mongodbObjectId() })
  id: string;

  @ApiProperty({ description: 'Name', example: faker.internet.userName() })
  name: string;

  @ApiProperty({
    type: String,
    description: 'Email',
    example: faker.internet.email(),
    nullable: true,
  })
  email: string | null;

  @ApiProperty({
    type: String,
    description: 'Avatar',
    example: faker.image.url(),
    nullable: true,
  })
  avatar: string | null;

  constructor(dto: IndexedUserDTO) {
    this.id = dto.id;
    this.name = dto.name;
    this.email = dto.email;
    this.avatar = dto.avatar ? `${process.env.HOST}${dto.avatar}` : null;
  }
}
