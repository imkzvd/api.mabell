import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Schema as SchemaDecorator } from '@nestjs/mongoose/dist/decorators/schema.decorator';
import { Schema, Types } from 'mongoose';
import { Domain } from '@api.mabell/core';
import { Artist } from '../artist/artist.schema';
import { BaseSchema } from '../../base/base.schema';

@SchemaDecorator({ versionKey: false, timestamps: true })
export class Album extends BaseSchema {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({
    required: true,
    type: [{ type: Schema.Types.ObjectId, ref: Artist.name, index: true }],
  })
  artists: Types.ObjectId[];

  @Prop({ required: true, type: String, enum: Domain.Album.AlbumTypes })
  type: Domain.Album.AlbumType;

  @Prop({ required: true, type: [{ type: String, enum: Domain.Common.Genres }] })
  genres: Domain.Common.Genre[];

  @Prop({ required: false, type: String, default: null })
  cover: string | null;

  @Prop({ required: false, type: String, default: null })
  color: string | null;

  @Prop({ required: false, type: String, default: '' })
  description: string;

  @Prop({ required: false, type: Date, default: null, index: -1 })
  releaseAt: Date | null;

  @Prop({ required: false, type: Boolean, default: false })
  isActive: boolean;

  @Prop({ required: false, type: Boolean, default: false })
  isPublic: boolean;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
