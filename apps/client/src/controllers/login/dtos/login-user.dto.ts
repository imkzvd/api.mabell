import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsAlphanumeric, IsString, MinLength } from 'class-validator';

export class LoginUserDTO {
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

  @ApiProperty({
    required: true,
    type: String,
    description: 'Password',
    example: faker.internet.password(),
  })
  // @IsStrongPassword() // TODO: enable before production
  @MinLength(1)
  @IsString()
  public readonly password: string;
}
