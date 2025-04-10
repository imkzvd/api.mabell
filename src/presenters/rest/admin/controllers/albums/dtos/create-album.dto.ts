import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsMongoId, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateAlbumDTO {
  @ApiProperty({
    required: true,
    type: String,
    description: 'Artist id',
    example: faker.database.mongodbObjectId(),
  })
  @IsMongoId()
  artist: string;

  @ApiProperty({
    required: false,
    type: String,
    description: 'Name',
    example: faker.person.firstName(),
  })
  @MinLength(1)
  @IsString()
  @IsOptional()
  name?: string;
}
