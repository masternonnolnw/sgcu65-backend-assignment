import { Injectable } from '@nestjs/common';
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}
  async login(email: string, password: string) {
    const auth = getAuth();
    const user = await signInWithEmailAndPassword(auth, email, password).catch(
      (error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        return errorMessage;
        // ..
      },
    );
    return user;
  }

  async register(createAuthDto: CreateAuthDto) {
    const allUsers = await this.userService.findAll();
    for (let i = 0; i < allUsers.length; i++) {
      if (allUsers[i].email == createAuthDto.email) {
        return 'email already exists';
      }
    }

    var createUserDto = new CreateUserDto();
    createUserDto.email = createAuthDto.email;
    createUserDto.firstname = createAuthDto.firstname;
    createUserDto.surname = createAuthDto.surname;
    createUserDto.salary = createAuthDto.salary;
    createUserDto.role = createAuthDto.role;
    var password = createAuthDto.password;
    if (!password) {
      return 'Password is required';
    }
    const auth = getAuth();
    const user = await createUserWithEmailAndPassword(
      auth,
      createUserDto.email,
      password,
    ).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return errorMessage;
      // ..
    });
    this.userService.create(createUserDto);
    return (
      'register email ' +
      createUserDto.email +
      ' success as ' +
      createUserDto.role +
      ' role'
    );
  }
  async signout() {
    const auth = getAuth();
    const res = await signOut(auth).catch((error) => {
      return error.message;
    });
    return 'signout success';
  }
  async checkCurrentUser() {
    const auth = getAuth();
    const user = auth.currentUser;
    return user;
  }
  async resetPassword(email: string) {
    const auth = getAuth();
    const res = sendPasswordResetEmail(auth, email).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      return errorMessage;
    });
    return 'Send password reset to ' + email;
  }
}
