import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateArtistDTO {
  @ApiProperty({
    required: false,
    type: String,
    description: 'Name',
    example: faker.person.firstName(),
  })
  @MinLength(1)
  @IsString()
  @IsNotEmpty()
  name: string;
}
