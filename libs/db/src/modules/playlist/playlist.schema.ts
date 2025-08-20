import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Schema as SchemaDecorator } from '@nestjs/mongoose/dist/decorators/schema.decorator';
import { Schema, Types } from 'mongoose';
import { Domain } from '@api.mabell/core';
import { User } from '../user/user.schema';
import { BaseSchema } from '../../base/base.schema';

@SchemaDecorator({ versionKey: false, timestamps: true })
export class Playlist extends BaseSchema {
  @Prop({ required: true, type: Schema.Types.ObjectId, ref: User.name, index: true })
  user: Types.ObjectId;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: false, type: [{ type: String, enum: Domain.Common.Genres }] })
  genres: Domain.Common.Genre[];

  @Prop({ required: false, type: String, default: null })
  cover: string | null;

  @Prop({ required: false, type: String, default: null })
  color: string | null;

  @Prop({ required: false, type: String, default: '' })
  description: string;

  @Prop({
    required: false,
    type: [
      {
        _id: false,
        id: { type: String, required: true },
        addedAt: { type: Date, required: true },
      },
    ],
  })
  tracks: { id: Domain.Track.TrackId; addedAt: Date }[];

  @Prop({ required: false, type: Boolean, default: false })
  isPublic: boolean;
}

export const PlaylistSchema = SchemaFactory.createForClass(Playlist);
