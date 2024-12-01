/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Test, TestingModule } from "@nestjs/testing";

import { UserController } from ".";


// Mock classes for CommandBus and QueryBus
class MockQueryBus {
    execute(query: any) {
        return Promise.resolve({ users: [], totalCount: 0 });
    }
}

class MockCommandBus {
    execute(command: any) {
        return Promise.resolve({ success: true });
    }
}

enum SortDirection {
    ASC = "ASC",
    DESC = "DESC",
}

describe('UserController', () => {
    let userController: UserController;
    let commandBus: MockCommandBus;
    let queryBus: MockQueryBus;

    beforeEach(async () => {
        // Mocking QueryBus and CommandBus
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                {
                    provide: QueryBus,
                    useValue: { execute: jest.fn() },  // Mocking execute function
                },
                {
                    provide: CommandBus,
                    useValue: { execute: jest.fn() },  // Mocking execute function for CommandBus (if needed)
                },
            ],
        }).compile();

        userController = module.get<UserController>(UserController);
        queryBus = module.get<QueryBus>(QueryBus);  // Access the mocked queryBus
    });

    describe('getUsers', () => {
        it('should return users successfully with formatted response', async () => {
            const mockQueryResult = {
                data: [
                    { id: '1', name: 'user4', email: 'user4@gmail.com', createdAt: '2024-11-14T05:01:10.335Z', role: 2 },
                    { id: '2', name: 'user3', email: 'user3@gmail.com', createdAt: '2024-11-06T09:19:47.818Z', role: 2 },
                ],
                pageSize: 4,
                pageNumber: 1,
                totalPages: 1,
                totalCount: 4,
                hasPreviousPage: false,
                hasNextPage: false,
            };

            // Mock the behavior of queryBus.execute
            jest.spyOn(queryBus, 'execute').mockResolvedValue(mockQueryResult as never);

            const query = { pageNumber: 1, pageSize: 4, sortField: 'createdAt', sortDirection: SortDirection.DESC };

            // Expected formatted response from the controller
            const expectedResponse = {
                data: [
                    { id: '1', name: 'user4', email: 'user4@gmail.com', createdAt: '2024-11-14T05:01:10.335Z', role: 2 },
                    { id: '2', name: 'user3', email: 'user3@gmail.com', createdAt: '2024-11-06T09:19:47.818Z', role: 2 },
                ],
                pageSize: 4,
                pageNumber: 1,
                totalPages: 1,
                totalCount: 4,
                hasPreviousPage: false,
                hasNextPage: false,
            };

            // Call the controller
            const result = await userController.getUsers(query);

            // Verify the final response matches the expected response
            expect(result).toEqual(expectedResponse);

            // Verify the queryBus.execute was called with the correct arguments
            expect(queryBus.execute).toHaveBeenCalledWith(query);
        });

    });
    // describe('deleteUser', () => {
    //     it('should delete user successfully', async () => {
    //         const body = { id: '1' };
    //         const result = await userController.deleteUser(body);
    //         expect(result).toEqual({ success: true });
    //         expect(commandBus.execute).toHaveBeenCalledWith(body);
    //     });

    //     it('should handle command execution errors', async () => {
    //         jest.spyOn(commandBus, 'execute').mockRejectedValueOnce(new Error('Delete failed'));
    //         const body = { id: '1' };
    //         await expect(userController.deleteUser(body)).rejects.toThrowError('Delete failed');
    //     });
    // });
});
