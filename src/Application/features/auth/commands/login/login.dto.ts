import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class LoginRequest {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class LoginResponse {
  token: string;
  refreshToken: string;
}
