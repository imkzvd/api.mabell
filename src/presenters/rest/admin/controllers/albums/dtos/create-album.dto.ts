import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsMongoId } from 'class-validator';

export class CreateAlbumDTO {
  @ApiProperty({
    required: true,
    type: String,
    description: 'Artist id',
    example: faker.database.mongodbObjectId(),
  })
  @IsMongoId()
  artist: string;
}
