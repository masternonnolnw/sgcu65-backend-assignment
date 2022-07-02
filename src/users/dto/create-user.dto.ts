import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  @ApiProperty()
  surname: string;

  @IsNotEmpty()
  @ApiProperty()
  salary: number;

  @IsNotEmpty()
  @ApiProperty()
  role: string;
}
