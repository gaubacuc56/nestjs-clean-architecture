import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ResetPasswordRequest {
  @IsNotEmpty()
  @IsString()
  resetKey: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  newPassword: string;
}
