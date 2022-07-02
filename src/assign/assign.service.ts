import { Injectable } from '@nestjs/common';
import { TasksService } from 'src/tasks/tasks.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AssignService {
  constructor(
    private readonly taskService: TasksService,
    private readonly userService: UsersService,
  ) {}
  async assign(taskId: string, userId: string) {
    try {
      const getTask = await this.taskService.findOne(taskId);
      const getUser = await this.userService.findOne(userId);

      let check = false;
      for (let i = 0; i < getTask.users.length; i++) {
        if (getTask.users[i] == getUser.id) {
          check = true;
          break;
        }
      }
      if (!check) {
        getTask.users.push(getUser);
        getUser.tasks.push(getTask);

        await getTask.save();
        await getUser.save();
        return getTask.name + ' assigned to ' + getUser.email;
      }
      return 'Already assigned';
    } catch (error) {
      console.log(error);
    }
  }
}
