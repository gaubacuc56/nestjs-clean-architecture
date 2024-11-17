import {
    Repository,
    EntityTarget,
    EntityManager,
    ObjectLiteral,
    FindOptionsOrder,
    DeepPartial,
} from "typeorm";

export class GenericRepository<T extends ObjectLiteral> {
    private repository: Repository<T>;

    constructor(
        entity: EntityTarget<T>,
        private manager: EntityManager,
    ) {
        this.repository = this.manager.getRepository(entity);
    }

    public async findMany(req: {
        pageNumber: number;
        pageSize: number;
        sortField: string;
        sortDirection: string;
        filters: object | undefined;
    }): Promise<[T[], number]> {
        const {
            pageNumber,
            pageSize,
            sortField = "createdAt",
            sortDirection = "ASC",
            filters,
        } = req;

        return await this.repository.findAndCount({
            skip: (pageNumber - 1) * pageSize,
            take: pageSize,
            where: filters,
            order: { [sortField]: sortDirection } as FindOptionsOrder<T>,
        });
    }

    public async findById(id: string): Promise<T | null> {
        return await this.repository.findOne({ where: { id } as any });
    }

    public async create(data: DeepPartial<T>): Promise<T> {
        const entity = this.repository.create(data);
        return await this.repository.save(entity);
    }

    public async update(id: string, data: Partial<T>): Promise<T | null> {
        await this.repository.update(id, data);
        return await this.findById(id);
    }

    public async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    public async softDelete(id: string): Promise<void> {
        await this.repository.update(id, { isDeleted: true } as any);
    }

    public getRepository(): Repository<T> {
        return this.repository; // Expose repository for custom queries
    }
}
