import { BadRequestException, Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { AUTH_ERRORS } from "@Domain/common/constant/message/auth";
import { Result } from "@Domain/result";

import {
    IUserRepository,
    IUserRepositoryToken,
} from "@Application/interfaces/user";

import { DeleteUserRequest } from "./deleteUser.dto";

@CommandHandler(DeleteUserRequest)
export class DeleteUserdHandler implements ICommandHandler<DeleteUserRequest> {
    constructor(
        @Inject(IUserRepositoryToken)
        private readonly userRepository: IUserRepository,
    ) {}
    async execute(req: DeleteUserRequest): Promise<Result> {
        const { id } = req;
        const user = await this.userRepository.findById(id);

        if (!user || user.isDeleted)
            throw new BadRequestException(AUTH_ERRORS.USER_NOT_FOUND);

        await this.userRepository.deleteUser(id);

        return new Result({});
    }
}
