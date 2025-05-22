import * as process from 'process';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { LabelValueRO } from '../../../../common/ros/label-value.ro';
import { UserRO } from '../../users/ros/user.ro';
import {
  Genres,
  getGenreLabelByValue,
} from '../../../../../../core/domain/common/constants/genres';
import { PlaylistDTO } from '../../../../../../core/app/components/playlist/queries/dtos/playlist.dto';
import { OffsetLimitPaginationRO } from '../../../../common/ros/offset-limit-pagination.ro';
import { PlaylistTrackDTO } from '../../../../../../core/app/components/track/queries/dtos/playlist-track.dto';
import { PlaylistTracksRO } from '../../tracks/ros/playlist-tracks.ro';
import { OffsetLimitPaginationResponseDTO } from '../../../../../../core/shared/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';

export class PlaylistRO {
  @ApiProperty({
    type: String,
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  id: string;

  @ApiProperty({
    type: () => UserRO,
    description: 'Owner',
  })
  owner: UserRO;

  @ApiProperty({
    type: String,
    description: 'Name',
    example: faker.music.songName(),
  })
  name: string;

  @ApiProperty({
    type: () => [LabelValueRO],
    description: 'Genres',
    example: new LabelValueRO(Genres['Hip-Hop'], getGenreLabelByValue(Genres['Hip-Hop'])),
  })
  genres: LabelValueRO[];

  @ApiProperty({
    type: String,
    description: 'Cover',
    example: faker.image.url(),
    nullable: true,
  })
  cover: string | null;

  @ApiProperty({
    type: String,
    description: 'Accent color',
    example: faker.color.rgb(),
    nullable: true,
  })
  color: string | null;

  @ApiProperty({
    type: String,
    description: 'Description',
    example: faker.lorem.text(),
  })
  description: string;

  @ApiProperty({ type: () => PlaylistTracksRO, description: 'Album tracks' })
  tracks: PlaylistTracksRO;

  @ApiProperty({ type: Boolean, description: 'Public', example: false })
  isPublic: boolean;

  @ApiProperty({
    description: 'Created date',
    example: faker.date.past().toISOString(),
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Updated date',
    example: faker.date.past().toISOString(),
  })
  updatedAt: Date;

  constructor(dto: PlaylistDTO, tracks?: OffsetLimitPaginationResponseDTO<PlaylistTrackDTO>) {
    this.id = dto.id;
    this.name = dto.name;
    this.owner = new UserRO(dto.owner);
    this.genres = dto.genres.map((genre) => new LabelValueRO(genre, getGenreLabelByValue(genre)));
    this.cover = dto.cover ? `${process.env.HOST}${dto.cover}` : null;
    this.color = dto.color;
    this.description = dto.description;
    this.tracks = tracks ? new PlaylistTracksRO(tracks) : new OffsetLimitPaginationRO();
    this.isPublic = dto.isPublic;
    this.createdAt = dto.createdAt;
    this.updatedAt = dto.updatedAt;
  }
}
