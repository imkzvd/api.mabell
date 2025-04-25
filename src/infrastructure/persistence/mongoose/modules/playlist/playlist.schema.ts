import { SchemaFactory } from '@nestjs/mongoose';
import { Playlist } from './playlist.document';

export const PlaylistSchema = SchemaFactory.createForClass(Playlist);
