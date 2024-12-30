import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email address' })
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
