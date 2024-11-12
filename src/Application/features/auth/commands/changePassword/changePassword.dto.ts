import { IsNotEmpty, IsString, MinLength } from 'class-validator';

import { User } from '@Domain/entities/User';


export class ChangePasswordRequest extends User {
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    oldPassword: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    newPassword: string
}
