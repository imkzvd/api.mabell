import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsMongoId } from 'class-validator';

export class CreatePlaylistDTO {
  @ApiProperty({
    required: true,
    type: String,
    description: 'User id',
    example: faker.database.mongodbObjectId(),
  })
  @IsMongoId()
  ownerId: string;
}
