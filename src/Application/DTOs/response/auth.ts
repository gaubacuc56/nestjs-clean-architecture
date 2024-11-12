import { Expose } from "class-transformer";

export class ILoginResponse {
    public token: string;
    public refreshToken: string;
}

export class IRefreshTokenResponse extends ILoginResponse { }

export class ISignUpResponse {
    @Expose()
    public email: string;
    @Expose()
    public createdAt: Date;
}
