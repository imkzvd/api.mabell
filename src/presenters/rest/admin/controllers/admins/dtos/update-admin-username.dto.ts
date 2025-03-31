import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsAlphanumeric, IsString, MinLength } from 'class-validator';

export class UpdateAdminUsernameDTO {
  @ApiProperty({
    required: true,
    type: String,
    description: 'Username',
    example: faker.internet.username(),
  })
  @MinLength(1)
  @IsAlphanumeric()
  @IsString()
  public readonly username: string;
}
