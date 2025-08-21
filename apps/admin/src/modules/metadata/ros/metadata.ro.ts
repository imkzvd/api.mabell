import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { LabelValueRO } from '@api.mabell/shared';
import { Shared, Domain } from '@api.mabell/core';

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
    const regions = Object.values(Domain.Common.Regions).map(
      (value) =>
        new LabelValueRO(
          new Shared.DTOs.LabelValueDTO(Domain.Common.getRegionLabelByValue(value), value),
        ),
    );
    const genres = Object.values(Domain.Common.Genres).map(
      (value) =>
        new LabelValueRO(
          new Shared.DTOs.LabelValueDTO(Domain.Common.getGenreLabelByValue(value), value),
        ),
    );
    const adminRoles = Object.values(Domain.Admin.AdminRoles).map(
      (value) =>
        new LabelValueRO(
          new Shared.DTOs.LabelValueDTO(Domain.Admin.getAdminRoleLabelByValue(value), value),
        ),
    );
    const albumTypes = Object.values(Domain.Album.AlbumTypes).map(
      (value) =>
        new LabelValueRO(
          new Shared.DTOs.LabelValueDTO(Domain.Album.getAlbumTypeLabelByValue(value), value),
        ),
    );

    this.regions = regions;
    this.genres = genres;
    this.adminRoles = adminRoles;
    this.albumTypes = albumTypes;
  }
}
