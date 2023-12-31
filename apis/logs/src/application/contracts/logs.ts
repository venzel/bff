import { LogsEntityInterface } from '@/domain/@shared/contracts';
import { FilterInputDto, Hateos, PaginationOutputDto } from './custom';

export interface LogsCreateInputDto {
    origin: string;
    key: string;
    type: string;
    code?: string;
    request: string;
    response: string;
}

export interface LogsOutputDto {
    id: string;
    origin: string;
    key: string;
    type: string;
    code: string;
    request: string;
    response: string;
    createdAt: Date;
}

export interface LogsCustomOutputDto<T extends LogsOutputDto | LogsOutputDto[]> {
    pagination?: PaginationOutputDto;
    data: T;
    _links?: Hateos[];
}

export interface LogsRepositoryInterface {
    create(entity: LogsEntityInterface): Promise<LogsEntityInterface>;
    filter(input: FilterInputDto): Promise<LogsEntityInterface[]>;
    findOneById(id: string): Promise<LogsEntityInterface | null>;
    findOneByKey(key: string): Promise<LogsEntityInterface | null>;
    deleteAll(): Promise<void>;
}

export interface LogsUseCaseInterface {
    create(input: LogsCreateInputDto): Promise<LogsCustomOutputDto<LogsOutputDto>>;
    filter(input: FilterInputDto): Promise<LogsCustomOutputDto<LogsOutputDto[]>>;
    findOneById(id: string): Promise<LogsCustomOutputDto<LogsOutputDto>>;
    findOneByKey(key: string): Promise<LogsCustomOutputDto<LogsOutputDto>>;
    deleteAll(): Promise<void>;
}
