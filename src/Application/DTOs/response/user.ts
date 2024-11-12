import { Expose } from "class-transformer";

export class IFindUserResponse {
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
