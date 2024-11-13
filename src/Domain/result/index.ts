import { HttpStatus } from "@Domain/common/enum/http";

export class Result<T = unknown> {
    public data?: T = undefined;
    public statusCode: HttpStatus = HttpStatus.OK;
    public message?: string = "Successfully";
    public currentPage?: number = undefined;
    public totalPages?: number = undefined;
    public totalCount?: number = undefined;
    public pageSize?: number = undefined;
    public hasPreviousPage?: boolean = undefined;
    public hasNextPage?: boolean = undefined;

    constructor(init?: Partial<Result<T>>) {
        Object.assign(this, init); // Assign any provided properties during instantiation
    }
}
