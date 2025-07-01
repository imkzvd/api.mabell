import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsMongoId } from 'class-validator';

export class AddTrackInPlaylistDTO {
  @ApiProperty({
    required: true,
    type: String,
    description: 'Track id',
    example: faker.database.mongodbObjectId(),
  })
  @IsMongoId()
  trackId: string;
}
