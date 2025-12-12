import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsEmail, IsISO8601, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterUserDTO {
  @ApiProperty({
    required: true,
    type: String,
    description: 'Email',
    example: faker.internet.email(),
  })
  @IsEmail()
  public readonly email: string;

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

  @ApiProperty({
    required: false,
    type: String,
    description: 'Profile name',
    example: faker.person.firstName(),
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  public readonly name: string;

  @ApiProperty({
    required: false,
    type: Date,
    description: 'Date of birth',
    example: faker.date.birthdate(),
  })
  @IsISO8601()
  public readonly birthDate: Date;
}
