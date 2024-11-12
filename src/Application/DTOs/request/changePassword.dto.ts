import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    oldPassword: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    newPassword: string
}
