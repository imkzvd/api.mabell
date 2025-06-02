import {
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
import { PlaylistRO } from './ros/playlist.ro';
import { UpdatePlaylistCoverDTO } from './dtos/update-playlist-cover.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreatePlaylistDTO } from './dtos/create-playlist.dto';
import { BadRequestException } from '../../../../../core/shared/exceptions';
import { UpdatePlaylistDTO } from './dtos/update-playlist.dto';
import { ParseObjectIdPipe } from '../../../common/pipes/parse-object-id.pipe';
import { AddTrackInPlaylistDTO } from './dtos/add-track-in-playlist.dto';
import { CreatePlaylistCommand } from '../../../../../core/app/cqrs/playlist/commands/create-playlist/create-playlist.command';
import { GetPlaylistQuery } from '../../../../../core/app/cqrs/playlist/queries/get-playlist/get-playlist.query';
import { UpdatePlaylistCommand } from '../../../../../core/app/cqrs/playlist/commands/update-playlist/update-playlist.command';
import { UpdatePlaylistCoverCommand } from '../../../../../core/app/cqrs/playlist/commands/update-playlist-cover/update-playlist-cover.command';
import { DeletePlaylistCoverCommand } from '../../../../../core/app/cqrs/playlist/commands/delete-playlist-cover/delete-playlist-cover.command';
import { DeletePlaylistCommand } from '../../../../../core/app/cqrs/playlist/commands/delete-playlist/delete-playlist.command';
import { AddTrackInPlaylistCommand } from '../../../../../core/app/cqrs/playlist/commands/add-track-in-playlist/add-track-in-playlist.command';
import { DeleteTrackFromPlaylistCommand } from '../../../../../core/app/cqrs/playlist/commands/delete-track-from-playlist/delete-track-from-playlist.command';
import { PlaylistTracksRO } from '../tracks/ros/playlist-tracks.ro';
import { OffsetLimitPaginationResponseDTO } from '../../../../../core/shared/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';

@ApiTags('Playlists')
@Controller({ path: '/playlists' })
export class PlaylistsController {
  constructor(
    private readonly _commandBus: CommandBus,
    private readonly _queryBus: QueryBus,
  ) {}

  @ApiOperation({ summary: 'Create an playlist', operationId: 'create' })
  @ApiBody({ type: CreatePlaylistDTO })
  @ApiCreatedResponse({ description: 'Playlist', type: PlaylistRO })
  @Post('/')
  async create(@Body() { ownerId }: CreatePlaylistDTO): Promise<PlaylistRO> {
    const createdPlaylistId = await this._commandBus.execute(new CreatePlaylistCommand(ownerId));
    const foundPlaylist = await this._queryBus.execute(new GetPlaylistQuery(createdPlaylistId));

    if (!foundPlaylist) {
      throw new BadRequestException('Playlist does not created');
    }

    return new PlaylistRO(foundPlaylist);
  }

  @ApiOperation({
    summary: 'Update playlist data',
    operationId: 'update',
  })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiBody({ type: UpdatePlaylistDTO })
  @ApiOkResponse({ description: 'Playlist', type: PlaylistRO })
  @Patch('/:id')
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: UpdatePlaylistDTO,
  ): Promise<PlaylistRO> {
    await this._commandBus.execute(new UpdatePlaylistCommand(id, dto));
    const foundPlaylist = await this._queryBus.execute(new GetPlaylistQuery(id));

    if (!foundPlaylist) {
      throw new BadRequestException('Playlist does not found');
    }

    return new PlaylistRO(foundPlaylist);
  }

  @ApiOperation({
    summary: 'Update playlist cover',
    operationId: 'updateCover',
  })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiBody({ type: UpdatePlaylistCoverDTO })
  @ApiOkResponse({ description: 'Playlist', type: PlaylistRO })
  @Patch('/:id/cover')
  async updateCover(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: UpdatePlaylistCoverDTO,
  ): Promise<PlaylistRO> {
    await this._commandBus.execute(new UpdatePlaylistCoverCommand(id, dto));
    const foundPlaylist = await this._queryBus.execute(new GetPlaylistQuery(id));

    if (!foundPlaylist) {
      throw new BadRequestException('Playlist does not found');
    }

    return new PlaylistRO(foundPlaylist);
  }

  @ApiOperation({
    summary: 'Delete cover of the playlist',
    operationId: 'deleteCover',
  })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiOkResponse({ description: 'Playlist', type: PlaylistRO })
  @Delete('/:id/cover')
  async deleteCover(@Param('id', ParseObjectIdPipe) id: string): Promise<PlaylistRO> {
    await this._commandBus.execute(new DeletePlaylistCoverCommand(id));
    const foundPlaylist = await this._queryBus.execute(new GetPlaylistQuery(id));

    if (!foundPlaylist) {
      throw new BadRequestException('Playlist does not found');
    }

    return new PlaylistRO(foundPlaylist);
  }

  @ApiOperation({
    summary: 'Delete an playlist by id',
    operationId: 'delete',
  })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiNoContentResponse({
    description: 'Playlist has been deleted',
    schema: { format: 'json' },
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async delete(@Param('id', ParseObjectIdPipe) id: string): Promise<void> {
    await this._commandBus.execute(new DeletePlaylistCommand(id));
  }

  @ApiOperation({
    summary: 'Add artist in playlist',
    operationId: 'addTrack',
  })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id of the playlist',
    example: faker.database.mongodbObjectId(),
  })
  @ApiBody({ type: AddTrackInPlaylistDTO })
  @ApiOkResponse({ description: 'Playlist', type: PlaylistRO })
  @Patch('/:id/tracks')
  async addTrack(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() { track }: AddTrackInPlaylistDTO,
  ): Promise<PlaylistRO> {
    await this._commandBus.execute(new AddTrackInPlaylistCommand(id, track));

    const foundPlaylist = await this._queryBus.execute(new GetPlaylistQuery(id));

    if (!foundPlaylist) {
      throw new BadRequestException('Playlist does not found');
    }

    return new PlaylistRO(foundPlaylist);
  }

  @ApiOperation({
    summary: 'Delete artist from the playlist',
    operationId: 'deleteTrack',
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
  @ApiNoContentResponse({
    description: 'Track has been deleted',
    schema: { format: 'json' },
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id/tracks/:trackId')
  async deleteTrack(
    @Param('id', ParseObjectIdPipe) id: string,
    @Param('trackId', ParseObjectIdPipe) trackId: string,
  ): Promise<void> {
    await this._commandBus.execute(new DeleteTrackFromPlaylistCommand(id, trackId));
  }

  @ApiOperation({ summary: 'Get playlist by id', operationId: 'get' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiOkResponse({ description: 'Playlist', type: PlaylistRO })
  @Get('/:id')
  async getOne(@Param('id', ParseObjectIdPipe) id: string): Promise<PlaylistRO> {
    const foundPlaylist = await this._queryBus.execute(new GetPlaylistQuery(id));

    if (!foundPlaylist) {
      throw new NotFoundException(`The playlists does not exist`);
    }

    return new PlaylistRO(foundPlaylist);
  }

  @ApiOperation({ summary: 'Get playlist tracks', operationId: 'getTracks' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiQuery({
    required: false,
    type: String,
    name: 'limit',
    description: 'Limit',
    example: 50,
  })
  @ApiQuery({
    required: false,
    type: String,
    name: 'offset',
    description: 'Offset',
    example: 0,
  })
  @ApiOkResponse({
    description: 'Playlist tracks',
    type: PlaylistTracksRO,
  })
  @Get('/:id/tracks')
  getTracks(
    @Param('id', ParseObjectIdPipe) id: string,
    @Query('limit', new DefaultValuePipe(25), ParseIntPipe) limit: number,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
  ): PlaylistTracksRO {
    console.log(id, limit, offset);
    return new PlaylistTracksRO(new OffsetLimitPaginationResponseDTO([], 0, 50, 0, false));
  }
}
