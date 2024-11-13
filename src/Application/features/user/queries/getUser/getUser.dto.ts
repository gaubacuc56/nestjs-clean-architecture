import { Expose } from "class-transformer";

export class GetUserRequest {
    constructor(public readonly userId: string) {}
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
