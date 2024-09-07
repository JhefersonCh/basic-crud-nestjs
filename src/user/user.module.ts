import { Module } from '@nestjs/common';
import { UserController } from './controllers/user/user.controller';
import { UserService } from './services/user/user.service';
import { SharedModule } from 'src/shared/shared.module';
import { CrudUserUseCase } from './usecases/user.useCase';

@Module({
  imports: [SharedModule],
  controllers: [UserController],
  providers: [UserService, CrudUserUseCase],
})
export class UserModule {}
