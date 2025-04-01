import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import * as process from 'process';
import { LabelValueRO } from '../../../../common/ros/label-value.ro';
import {
  getRegionLabelByValue,
  Regions,
} from '../../../../../../core/domain/common/constants/regions';
import {
  Genres,
  getGenreLabelByValue,
} from '../../../../../../core/domain/common/constants/genres';
import { SimplifiedUserDTO } from '../../../../../../core/app/components/user/dtos/simplified-user.dto';

export class SimplifiedUserRO {
  @ApiProperty({
    type: String,
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  id: string;

  @ApiProperty({
    type: String,
    description: 'Username',
    example: faker.internet.username(),
  })
  username: string;

  @ApiProperty({
    type: String,
    description: 'Birth name',
    example: faker.person.firstName(),
  })
  name: string;

  @ApiProperty({
    type: String,
    description: 'Email',
    example: faker.internet.email(),
    nullable: true,
  })
  email: string | null;

  @ApiProperty({
    type: Date,
    description: 'Birth date',
    example: faker.date.birthdate(),
  })
  birthDate: Date;

  @ApiProperty({
    type: () => LabelValueRO,
    description: 'Region',
    example: new LabelValueRO(
      Regions['Russian Federation'],
      getRegionLabelByValue(Regions['Russian Federation']),
    ),
  })
  region: LabelValueRO;

  @ApiProperty({
    type: () => [LabelValueRO],
    description: 'Favorite genres',
    example: new LabelValueRO(Genres['Hip-Hop'], getGenreLabelByValue(Genres['Hip-Hop'])),
  })
  genres: LabelValueRO[];

  @ApiProperty({
    type: String,
    description: 'Avatar URL',
    example: `${process.env.HOST}/${faker.system.commonFileName('webp')}`,
    nullable: true,
  })
  avatar: string | null;

  @ApiProperty({
    type: String,
    description: 'Accent color',
    example: faker.color.rgb(),
    nullable: true,
  })
  color: string | null;

  @ApiProperty({ type: Boolean, description: 'Block', example: false })
  isBlocked: boolean;

  @ApiProperty({ type: Boolean, description: 'Verification', example: false })
  isVerified: boolean;

  @ApiProperty({
    type: Boolean,
    description: 'Public',
    example: false,
  })
  isPublic: boolean;

  @ApiProperty({ type: Boolean, description: 'Premium', example: false })
  isPremium: boolean;

  @ApiProperty({
    type: Date,
    description: 'Reg. date',
    example: faker.date.anytime(),
  })
  createdAt: Date;

  @ApiProperty({
    type: Date,
    description: 'Update date',
    example: faker.date.anytime(),
  })
  updatedAt: Date;

  constructor(dto: SimplifiedUserDTO) {
    this.id = dto.id;
    this.username = dto.username;
    this.name = dto.name;
    this.email = dto.email;
    this.birthDate = dto.birthDate;
    this.region = new LabelValueRO(dto.region, getRegionLabelByValue(dto.region));
    this.genres = dto.genres.map((genre) => new LabelValueRO(genre, getGenreLabelByValue(genre)));
    this.avatar = `${process.env.HOST}${dto.avatar}`;
    this.color = dto.color;
    this.isBlocked = dto.isBlocked;
    this.isVerified = dto.isVerified;
    this.isPublic = dto.isPublic;
    this.isPremium = dto.isPremium;
    this.createdAt = dto.createdAt;
    this.updatedAt = dto.updatedAt;
  }
}
