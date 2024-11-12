import { IFindUserResponse } from "@Application/DTOs/response/user";
import { Result } from "@Domain/result";

export interface IUserService {
    findById(req: { id: string }): Promise<Result<IFindUserResponse | null>>;
}
