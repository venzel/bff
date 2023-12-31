import {
    AccountsCommonsInterface,
    AccountsCustomOutputDto,
    AccountsOutputDto,
} from '@/application/contracts';
import { customOutputDto } from '@/application/helpers';
import { AccountMapper } from '@/application/mappers';
import { AppError } from '@/main/errors';

export class FindOneAccountByEmailUseCase {
    constructor(private readonly commons: AccountsCommonsInterface) {}

    async execute(email: string): Promise<AccountsCustomOutputDto<AccountsOutputDto>> {
        const entity = await this.commons.repositories.accounts.findOneByEmail(email);

        if (!entity) {
            throw new AppError('Account not found', 204);
        }

        const outputDto = AccountMapper.entityToDto(entity);

        return customOutputDto(outputDto);
    }
}
