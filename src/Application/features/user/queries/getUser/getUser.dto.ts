import { Expose } from "class-transformer";

import { IRequest } from "@Domain/common/dtos/request.dto";

export class GetUserRequest extends IRequest {
    constructor(id?: string) {
        if (id) super(id);
    }
}

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
