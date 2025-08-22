import {
  BadRequestException,
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { Domain } from '@api.mabell/core';
import { CommandBus } from '@api.mabell/cqrs';
import { QueryBus } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';
import { ParseObjectIdPipe } from '@api.mabell/shared';
import { PlaylistRO } from './ros/playlist.ro';
import { UpdatePlaylistCoverDTO } from './dtos/update-playlist-cover.dto';
import { CreatePlaylistDTO } from './dtos/create-playlist.dto';
import { UpdatePlaylistDTO } from './dtos/update-playlist.dto';
import { AddTrackInPlaylistDTO } from './dtos/add-track-in-playlist.dto';
import { Roles } from '../../decorators/roles.decorator';
import { PlaylistTracksRO } from '../track/ros/playlist-tracks.ro';
import { PlaylistsRO } from './ros/playlists.ro';

@ApiTags('Playlist')
@Roles(Domain.Admin.AdminRoles.Owner, Domain.Admin.AdminRoles.Admin)
@Controller({ path: '/playlists' })
export class PlaylistController {
  constructor(
    private readonly _commandBus: CommandBus,
    private readonly _queryBus: QueryBus,
  ) {}

  @ApiOperation({ summary: 'Create an playlist', operationId: 'createPlaylist' })
  @ApiBody({ type: CreatePlaylistDTO })
  @ApiCreatedResponse({ description: 'Playlist', type: PlaylistRO })
  @Post('/')
  async createPlaylist(@Body() { userId }: CreatePlaylistDTO): Promise<PlaylistRO> {
    const { id: createdPlaylistId } = await this._commandBus.execute(
      new App.CQRS.CreatePlaylistCommand(userId),
    );
    const foundPlaylist = await this._queryBus.execute(
      new App.CQRS.GetPlaylistQuery(createdPlaylistId),
    );

    if (!foundPlaylist) {
      throw new BadRequestException('Playlist does not created');
    }

    return new PlaylistRO(foundPlaylist);
  }

  @ApiOperation({ summary: 'Update playlist data', operationId: 'updatePlaylist' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiBody({ type: UpdatePlaylistDTO })
  @ApiOkResponse({ description: 'Playlist', type: PlaylistRO })
  @Patch('/:id')
  async updatePlaylist(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: UpdatePlaylistDTO,
  ): Promise<PlaylistRO> {
    await this._commandBus.execute(new App.CQRS.UpdatePlaylistCommand(id, dto));
    const foundPlaylist = await this._queryBus.execute(new App.CQRS.GetPlaylistQuery(id));

    if (!foundPlaylist) {
      throw new BadRequestException('Playlist does not found');
    }

    return new PlaylistRO(foundPlaylist);
  }

  @ApiOperation({ summary: 'Update playlist cover', operationId: 'updatePlaylistCover' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiBody({ type: UpdatePlaylistCoverDTO })
  @ApiOkResponse({ description: 'Playlist', type: PlaylistRO })
  @Patch('/:id/cover')
  async updatePlaylistCover(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: UpdatePlaylistCoverDTO,
  ): Promise<PlaylistRO> {
    await this._commandBus.execute(new App.CQRS.UpdatePlaylistCoverCommand(id, dto));
    const foundPlaylist = await this._queryBus.execute(new App.CQRS.GetPlaylistQuery(id));

    if (!foundPlaylist) {
      throw new BadRequestException('Playlist does not found');
    }

    return new PlaylistRO(foundPlaylist);
  }

  @ApiOperation({ summary: 'Delete cover of the playlist', operationId: 'deletePlaylistCover' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiOkResponse({ description: 'Playlist', type: PlaylistRO })
  @Delete('/:id/cover')
  async deletePlaylistCover(@Param('id', ParseObjectIdPipe) id: string): Promise<PlaylistRO> {
    await this._commandBus.execute(new App.CQRS.DeletePlaylistCoverCommand(id));
    const foundPlaylist = await this._queryBus.execute(new App.CQRS.GetPlaylistQuery(id));

    if (!foundPlaylist) {
      throw new BadRequestException('Playlist does not found');
    }

    return new PlaylistRO(foundPlaylist);
  }

  @ApiOperation({ summary: 'Delete an playlist by id', operationId: 'deletePlaylist' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiNoContentResponse({ description: 'Playlist has been deleted', schema: { format: 'json' } })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async deletePlaylist(@Param('id', ParseObjectIdPipe) id: string): Promise<void> {
    await this._commandBus.execute(new App.CQRS.DeletePlaylistCommand(id));
  }

  @ApiOperation({ summary: 'Add artist in playlist', operationId: 'addTrackInPlaylist' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id of the playlist',
    example: faker.database.mongodbObjectId(),
  })
  @ApiBody({ type: AddTrackInPlaylistDTO })
  @ApiOkResponse({ description: 'Playlist', type: PlaylistRO })
  @Patch('/:id/tracks')
  async addTrackInPlaylist(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() { trackId }: AddTrackInPlaylistDTO,
  ): Promise<PlaylistRO> {
    await this._commandBus.execute(new App.CQRS.AddTrackInPlaylistCommand(id, trackId));

    const foundPlaylist = await this._queryBus.execute(new App.CQRS.GetPlaylistQuery(id));

    if (!foundPlaylist) {
      throw new BadRequestException('Playlist does not found');
    }

    return new PlaylistRO(foundPlaylist);
  }

  @ApiOperation({
    summary: 'Delete artist from the playlist',
    operationId: 'deleteTrackFromPlaylist',
  })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id of the playlist',
    example: faker.database.mongodbObjectId(),
  })
  @ApiParam({
    type: String,
    name: 'trackId',
    description: 'Id of the artist',
    example: faker.database.mongodbObjectId(),
  })
  @ApiNoContentResponse({ description: 'Track has been deleted', schema: { format: 'json' } })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id/tracks/:trackId')
  async deleteTrackFromPlaylist(
    @Param('id', ParseObjectIdPipe) id: string,
    @Param('trackId', ParseObjectIdPipe) trackId: string,
  ): Promise<void> {
    await this._commandBus.execute(new App.CQRS.DeleteTrackFromPlaylistCommand(id, trackId));
  }

  @ApiOperation({ summary: 'Get playlists', operationId: 'getUserPlaylists' })
  @ApiQuery({
    required: true,
    type: String,
    name: 'userId',
    description: 'User Id',
    example: faker.database.mongodbObjectId(),
  })
  @Roles(Domain.Admin.AdminRoles.Guest)
  @ApiOkResponse({ description: 'Playlist', type: PlaylistsRO })
  @Get('/')
  async getUserPlaylists(@Query('userId', ParseObjectIdPipe) userId: string): Promise<PlaylistsRO> {
    const foundPlaylists = await this._queryBus.execute(new App.CQRS.GetUserPlaylistsQuery(userId));

    return new PlaylistsRO(foundPlaylists);
  }

  @ApiOperation({ summary: 'Get playlist by id', operationId: 'getPlaylist' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @Roles(Domain.Admin.AdminRoles.Guest)
  @ApiOkResponse({ description: 'Playlist', type: PlaylistRO })
  @Get('/:id')
  async getPlaylist(@Param('id', ParseObjectIdPipe) id: string): Promise<PlaylistRO> {
    const foundPlaylist = await this._queryBus.execute(new App.CQRS.GetPlaylistQuery(id));

    if (!foundPlaylist) {
      throw new NotFoundException(`The playlists does not exist`);
    }

    return new PlaylistRO(foundPlaylist);
  }

  @ApiOperation({ summary: 'Get playlist tracks', operationId: 'getPlaylistTracks' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiQuery({ required: false, type: String, name: 'limit', description: 'Limit', example: 50 })
  @ApiQuery({ required: false, type: String, name: 'offset', description: 'Offset', example: 0 })
  @ApiOkResponse({ description: 'Playlist tracks', type: PlaylistTracksRO })
  @Roles(Domain.Admin.AdminRoles.Guest)
  @Get('/:id/tracks')
  async getPlaylistTracks(
    @Param('id', ParseObjectIdPipe) id: string,
    @Query('limit', new DefaultValuePipe(25), ParseIntPipe) limit: number,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
  ): Promise<PlaylistTracksRO> {
    const foundTracks = await this._queryBus.execute(
      new App.CQRS.GetPlaylistTracksQuery(id, { pagination: { limit, offset } }),
    );

    return new PlaylistTracksRO(foundTracks);
  }
}
