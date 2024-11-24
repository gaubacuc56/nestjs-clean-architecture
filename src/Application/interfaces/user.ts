import { User } from "@Domain/entities/User";

export const IUserRepositoryToken = Symbol("IUserRepository");
export interface IUserRepository {
    findByEmail(email: string): Promise<User | null>;
    findByResetKey(resetKey: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    createUser(data: {
        password: string;
        email: string;
        name: string;
    }): Promise<User>;
    updateResetKey(
        id: string,
        resetKey: string | undefined,
        resetKeyExpired: Date | undefined,
    ): Promise<void>;

    changePassword(id: string, password: string): Promise<void>;
    findUsers(req: {
        pageNumber: number;
        pageSize: number;
        sortField: string;
        sortDirection: string;
        filters: object | undefined;
    }): Promise<[User[], number]>;

    deleteUser(id: string): Promise<void>;
}
