import { Inject } from "@nestjs/common";
import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";

import { User } from "@Domain/entities/User";
import { BadRequestException } from "@Domain/exceptions/error-handler";
import { Result } from "@Domain/result";

import {
    IUserRepository,
    IUserRepositoryToken,
} from "@Application/interfaces/user";
import { parseFilter } from "@Application/utils/isValidJson";
import { paginate } from "@Application/utils/paginate";

import { Mapper } from "@Shared/mapper";

import { GetUserResponse } from "../getUser/getUser.dto";

import { GetUsersRequest } from "./getUsers.dto";

@QueryHandler(GetUsersRequest)
export class GetUsersHandler implements IQueryHandler<GetUsersRequest> {
    constructor(
        @Inject(IUserRepositoryToken)
        private readonly userRepository: IUserRepository,
    ) {}
    async execute(
        req: GetUsersRequest,
    ): Promise<Result<GetUserResponse[] | null>> {
        const { pageNumber, pageSize, filters } = req;

        if (filters && !parseFilter(filters))
            throw new BadRequestException("Invalid filters");

        return paginate<User, GetUserResponse>(
            () =>
                this.userRepository.findUsers({
                    ...req,
                    filters: parseFilter(filters),
                }),
            pageSize,
            pageNumber,
            (entity) => Mapper(GetUserResponse, entity),
        );
    }
}
