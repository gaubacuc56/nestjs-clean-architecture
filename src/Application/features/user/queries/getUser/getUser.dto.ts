import { Expose } from "class-transformer";

import { IRequest } from "@Domain/common/dtos/request.dto";

export class GetUserRequest extends IRequest {}

export class GetUserResponse {
    @Expose()
    public id: string;
    @Expose()
    public name: string;
    @Expose()
    public email: string;
    @Expose()
    public createdAt: Date;
    @Expose()
    public role: number;
}
