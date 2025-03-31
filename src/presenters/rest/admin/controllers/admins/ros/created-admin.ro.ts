import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';

export class CreatedAdminRO {
  @ApiProperty({
    type: String,
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  readonly id: string;

  @ApiProperty({
    type: String,
    description: 'Password',
    example: faker.internet.password(),
  })
  readonly password: string;

  constructor(id: string, password: string) {
    this.id = id;
    this.password = password;
  }
}
