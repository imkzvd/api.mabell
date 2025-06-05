import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import * as process from 'process';
import { UserDTO } from '../../../../../../core/app/components/user/dtos/user.dto';

export class UserRO {
  @ApiProperty({
    type: String,
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  id: string;

  @ApiProperty({
    type: String,
    description: 'Birth name',
    example: faker.person.firstName(),
  })
  name: string;

  @ApiProperty({
    type: String,
    description: 'Avatar URL',
    example: `${process.env.HOST}/${faker.system.commonFileName('webp')}`,
    nullable: true,
  })
  avatar: string | null;

  @ApiProperty({
    type: String,
    description: 'Accent color',
    example: faker.color.rgb(),
    nullable: true,
  })
  color: string | null;

  constructor(dto: UserDTO) {
    this.id = dto.id;
    this.name = dto.name;
    this.avatar = dto.avatar ? `${process.env.HOST}${dto.avatar}` : null;
    this.color = dto.color;
  }
}
