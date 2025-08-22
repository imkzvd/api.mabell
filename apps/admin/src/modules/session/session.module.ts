import { Module } from '@nestjs/common';
import { JWTModule } from '@api.mabell/jwt';
import { DeleteAdminRefreshTokenByIdHandler } from './commands/delete-admin-refresh-token-by-id.handler';
import { SessionController } from './session.controller';
import { adminTokenServiceProvider } from '../admin/providers/admin-token-service.provider';

@Module({
  imports: [JWTModule],
  providers: [adminTokenServiceProvider, DeleteAdminRefreshTokenByIdHandler],
  controllers: [SessionController],
})
export class SessionModule {}
