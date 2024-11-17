import { Injectable } from "@nestjs/common";

import { EntityManager, MoreThanOrEqual } from "typeorm";

import { User } from "@Domain/entities/User";

import { IUserRepository } from "@Application/interfaces/user";

import { GenericRepository } from "../_generic";

@Injectable()
export class UserRepository implements IUserRepository {
    private userRepository: GenericRepository<User>;
    constructor(private manager: EntityManager) {
        this.userRepository = new GenericRepository(User, manager);
    }

    public async findByEmail(email: string) {
        return await this.userRepository
            .getRepository()
            .findOne({ where: { email } });
    }

    public async findByResetKey(resetKey: string) {
        return await this.userRepository.getRepository().findOne({
            where: {
                resetKey,
                resetKeyExpired: MoreThanOrEqual(new Date()),
            },
        });
    }

    public async findById(id: string) {
        return await this.userRepository.findById(id);
    }

    public async createUser(data: {
        password: string;
        email: string;
        name: string;
    }) {
        return this.userRepository.create(data);
    }

    public async updateResetKey(
        id: string,
        resetKey: string | undefined,
        resetKeyExpired: Date | undefined,
    ) {
        await this.userRepository.update(id, { resetKey, resetKeyExpired });
    }

    public async changePassword(id: string, password: string) {
        await this.userRepository.update(id, { password });
    }

    public async deleteUser(id: string) {
        await this.userRepository.softDelete(id);
    }

    public async findUsers(req: {
        pageNumber: number;
        pageSize: number;
        sortField: string;
        sortDirection: string;
        filters: object | undefined;
    }) {
        return await this.userRepository.findMany(req);
    }
}
