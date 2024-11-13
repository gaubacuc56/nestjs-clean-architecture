import { LoginResponse } from "../login/login.dto";

export class RefreshTokenRequest {
    constructor(public readonly header: string | undefined) {}
}
export class RefreshTokenResponse extends LoginResponse {}
