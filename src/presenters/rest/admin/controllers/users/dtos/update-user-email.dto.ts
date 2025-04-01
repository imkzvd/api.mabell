import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsEmail } from 'class-validator';

export class UpdateUserEmailDTO {
  @ApiProperty({
    required: true,
    type: String,
    description: 'Email',
    example: faker.internet.email(),
  })
  @IsEmail()
  email: string;
}
