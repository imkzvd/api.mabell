import { SchemaFactory } from '@nestjs/mongoose';
import { Track } from './track.document';

export const TrackSchema = SchemaFactory.createForClass(Track);
