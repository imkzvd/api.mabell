import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { App } from '@api.mabell/core';
import { QueryBus } from '@api.mabell/cqrs';
import { ParseObjectIdPipe } from '@api.mabell/shared';
import { TrackRO } from './ros/track.ro';

@ApiTags('Track')
@Controller({ path: '/tracks' })
export class TrackController {
  constructor(private readonly _queryBus: QueryBus) {}

  @ApiOperation({ summary: 'Get an track by id', operationId: 'getTrack' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiOkResponse({ description: 'Track', type: TrackRO })
  @Get('/:id')
  async getTrack(@Param('id', ParseObjectIdPipe) id: string): Promise<TrackRO> {
    const foundTrack = await this._queryBus.execute(
      new App.CQRS.GetTrackQuery(id, { isPublic: true }),
    );

    if (!foundTrack) {
      throw new NotFoundException('Track does not exist');
    }

    return new TrackRO(foundTrack);
  }
}
