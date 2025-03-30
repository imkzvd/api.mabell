import { Schema } from '@nestjs/mongoose/dist/decorators/schema.decorator';
import { Prop } from '@nestjs/mongoose';
import { BasePersonDocument } from '../../base/base-person-document.abstract';
import {
  AdminRoles,
  AdminRole,
} from '../../../../../core/domain/components/admin/constants/admin-roles';

@Schema({ versionKey: false, timestamps: true })
export class Admin extends BasePersonDocument {
  @Prop({
    required: false,
    type: String,
    enum: AdminRoles,
    default: AdminRoles.Guest,
  })
  public readonly role: AdminRole;
}
