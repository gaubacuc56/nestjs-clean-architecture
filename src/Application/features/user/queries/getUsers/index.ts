import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";

import { UserRepository } from "@Infrastructure/database/repository/user";

import { User } from "@Domain/entities/User";
import { BadRequestException } from "@Domain/exceptions/error-handler";
import { Result } from "@Domain/result";

import { parseFilter } from "@Application/utils/isValidJson";
import { paginate } from "@Application/utils/paginate";

import { Mapper } from "@Shared/mapper";

import { GetUserResponse } from "../getUser/getUser.dto";

import { GetUsersRequest } from "./getUsers.dto";

@QueryHandler(GetUsersRequest)
export class GetUsersHandler implements IQueryHandler<GetUsersRequest> {
    constructor(private readonly userRepository: UserRepository) {}
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
