import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { animationFrameScheduler } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    const createduser = new this.userModel(createUserDto);
    return await createduser.save();
  }

  async findAll() {
    return await this.userModel.find().exec();
  }

  async findOne(id: number) {
    return await this.userModel.findById(id).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return await this.userModel.findByIdAndRemove(id);
  }

  async search(firstname: string, surname: string, role: string) {
    const allUsers = await this.userModel.find().exec();
    const newAllUsers = [];
    for (let i = 0; i < allUsers.length; i++) {
      let check = true;
      if (firstname) {
        if (allUsers[i].firstname.indexOf(firstname) <= -1) {
          check = false;
        }
      }
      if (surname) {
        if (allUsers[i].surname.indexOf(surname) <= -1) {
          check = false;
        }
      }
      if (role) {
        if (allUsers[i].role.indexOf(role) <= -1) {
          check = false;
        }
      }
      if (check) {
        newAllUsers.push(allUsers[i]);
      }
    }
    return newAllUsers;
  }
}
