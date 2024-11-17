import { IsNotEmpty, IsString } from "class-validator";

export class IRequest {
    @IsNotEmpty()
    @IsString()
    id: string;
}
