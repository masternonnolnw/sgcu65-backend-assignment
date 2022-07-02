import { Module } from '@nestjs/common';
import { AssignService } from './assign.service';
import { AssignController } from './assign.controller';
import { TasksModule } from 'src/tasks/tasks.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TasksModule, UsersModule],
  controllers: [AssignController],
  providers: [AssignService],
})
export class AssignModule {}
