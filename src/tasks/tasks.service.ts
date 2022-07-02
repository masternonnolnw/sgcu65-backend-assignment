import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskDocument } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(createtaskDto: CreateTaskDto) {
    const createdtask = new this.taskModel(createtaskDto);
    return await createdtask.save();
  }

  async findAll() {
    return await this.taskModel.find().exec();
  }

  async findOne(id: string) {
    return await this.taskModel.findById(id).exec();
  }

  async update(id: string, updatetaskDto: UpdateTaskDto) {
    return await this.taskModel.findByIdAndUpdate(id, updatetaskDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return await this.taskModel.findByIdAndRemove(id);
  }

  async search(name: string, id: string) {
    const allTasks = await this.taskModel.find().exec();
    const newAllTasks = [];
    for (let i = 0; i < allTasks.length; i++) {
      let check = true;
      if (name) {
        if (allTasks[i].name.toLowerCase().indexOf(name.toLowerCase()) <= -1) {
          check = false;
        }
      }
      if (id) {
        if (allTasks[i].id.toLowerCase().indexOf(id.toLowerCase()) <= -1) {
          check = false;
        }
      }
      if (check) {
        newAllTasks.push(allTasks[i]);
      }
    }
    return newAllTasks;
  }
}
