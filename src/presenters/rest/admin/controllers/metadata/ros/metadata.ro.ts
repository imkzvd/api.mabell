import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { LabelValueRO } from '../../../../common/ros/label-value.ro';
import {
  getRegionLabelByValue,
  Regions,
} from '../../../../../../core/domain/common/constants/regions';
import {
  Genres,
  getGenreLabelByValue,
} from '../../../../../../core/domain/common/constants/genres';
import {
  AdminRoles,
  getAdminRoleLabelByValue,
} from '../../../../../../core/domain/components/admin/constants/admin-roles';
import {
  AlbumTypes,
  getAlbumTypeLabelByValue,
} from '../../../../../../core/domain/components/album/constants/album-types';

export class MetadataRO {
  @ApiProperty({
    description: 'Regions',
    example: faker.database.mongodbObjectId(),
    type: () => [LabelValueRO],
  })
  regions: LabelValueRO[];

  @ApiProperty({
    description: 'Genres',
    example: faker.database.mongodbObjectId(),
    type: () => [LabelValueRO],
  })
  genres: LabelValueRO[];

  @ApiProperty({
    description: 'Admin roles',
    example: faker.database.mongodbObjectId(),
    type: () => [LabelValueRO],
  })
  adminRoles: LabelValueRO[];

  @ApiProperty({
    description: 'Album types',
    example: faker.database.mongodbObjectId(),
    type: () => [LabelValueRO],
  })
  albumTypes: LabelValueRO[];

  constructor() {
    const regions = Object.values(Regions).map(
      (value) => new LabelValueRO(value, getRegionLabelByValue(value)),
    );
    const genres = Object.values(Genres).map(
      (value) => new LabelValueRO(value, getGenreLabelByValue(value)),
    );
    const adminRoles = Object.values(AdminRoles).map(
      (value) => new LabelValueRO(value, getAdminRoleLabelByValue(value)),
    );
    const albumTypes = Object.values(AlbumTypes).map(
      (value) => new LabelValueRO(value, getAlbumTypeLabelByValue(value)),
    );

    this.regions = regions;
    this.genres = genres;
    this.adminRoles = adminRoles;
    this.albumTypes = albumTypes;
  }
}
