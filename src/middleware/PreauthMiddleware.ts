/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { getAuth } from 'firebase/auth';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class PreauthMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}

  async use(req: Request, res: Response, next: any) {
    const auth = getAuth();
    if (auth.currentUser) {
      const allUsers = await this.usersService.findAll();
      for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].email == auth.currentUser.email) {
          if (allUsers[i].role.toLowerCase() == 'admin') {
            next();
          } else {
            this.accessDenied(req.url, res);
          }
        }
      }
    } else {
      this.accessDenied(req.url, res);
    }
  }

  private accessDenied(url: string, res: Response) {
    res.status(403).json({
      statusCode: 403,
      timestamp: new Date().toISOString(),
      path: url,
      message: 'Access Denied',
    });
  }
}
