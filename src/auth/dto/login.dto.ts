import {IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Username must be a valid email address' })
  
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
