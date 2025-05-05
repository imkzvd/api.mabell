import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Schema as SchemaDecorator } from '@nestjs/mongoose/dist/decorators/schema.decorator';
import { Schema, Types } from 'mongoose';
import { Artist } from '../artist/artist.schema';
import { BaseSchema } from '../../base/base.schema';

@SchemaDecorator({ versionKey: false, timestamps: true })
export class Track extends BaseSchema {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: Schema.Types.ObjectId, ref: 'Album' })
  album: Types.ObjectId;

  @Prop({ required: true, type: Number })
  trackNumber: number;

  @Prop({ required: true, type: [{ type: Schema.Types.ObjectId, ref: Artist.name }] })
  artists: Types.ObjectId[];

  @Prop({ required: false, type: [{ type: Schema.Types.ObjectId, ref: Artist.name }] })
  featArtists: Types.ObjectId[];

  @Prop({ required: false, type: String, default: null })
  file: string | null;

  @Prop({ required: false, type: Number, default: null })
  duration: number | null;

  @Prop({ required: false, type: Boolean, default: false })
  isExplicit: boolean;

  @Prop({ required: false, type: Boolean, default: false })
  isActive: boolean;

  @Prop({ required: false, type: Boolean, default: false })
  isPublic: boolean;
}

export const TrackSchema = SchemaFactory.createForClass(Track);
