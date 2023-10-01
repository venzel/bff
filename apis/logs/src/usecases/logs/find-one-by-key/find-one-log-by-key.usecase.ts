import { LogMapper } from '@/data/mappers';
import { LogRepositoryInterface } from '@/domain/@shared/contracts';
import { LogOutputCustomDto, LogOutputDto } from '@/usecases/contracts';
import { outputCustomDto } from '@/usecases/helpers';

export class FindOneLogByKeyUseCase {
    constructor(private readonly logRepository: LogRepositoryInterface) {}

    async execute(key: string): Promise<LogOutputCustomDto<LogOutputDto>> {
        const entity = await this.logRepository.findOneByKey(key);

        if (!entity) {
            throw new Error('Log not found');
        }

        const outputDto = LogMapper.entityToDto(entity);

        return outputCustomDto(outputDto);
    }
}
