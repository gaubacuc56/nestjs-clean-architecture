import { Injectable } from "@nestjs/common";
import { IFindUserResponse } from "@Application/DTOs/response/user";
import { IUserService } from "./user.interface";
import { Result } from "@Domain/result";
import { Mapper } from "@Shared/mapper";
import { IUserRepository } from "@Application/interfaces/user";
import { UserRepository } from "@Infrastructure/database/repository/user";

@Injectable()
export class UserService implements IUserService {
    constructor(private readonly userRepository: UserRepository) { }

    public async findById(req: { id: string }) {
        const { id } = req;
        const user = await this.userRepository.findById(id);
        return new Result({
            data: user ? Mapper(IFindUserResponse, user) : null
        });
    }
}
