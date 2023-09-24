import { UserIntegrationInterface } from '@/framework/integrations/contracts';
import { AppError } from '@/infra/main/errors';
import { toUserOutputDtoCollection } from '@/infra/main/mappers';
import { UserOutputDto } from '@/usecases/contracts';

export class FindAllUsersUseCase {
    constructor(private readonly integration: UserIntegrationInterface) {}

    async execute(): Promise<UserOutputDto[]> {
        try {
            const externalUsers = await this.integration.findAll();

            if (!externalUsers.length) {
                throw new AppError('No users found', 204);
            }

            return toUserOutputDtoCollection(externalUsers);
        } catch (e) {
            throw e;
        }
    }
}
