import { Expose } from "class-transformer";
import { IsString, IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class RegisterRequest {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    password: string;
}

export class RegisterResponse {
    @Expose()
    public email: string;
    @Expose()
    public createdAt: Date;
}
