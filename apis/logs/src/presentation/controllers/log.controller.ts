import { CreateLogUseCase, FilterLogsUseCase, FindOneLogByIdUseCase } from '@/usecases';
import { LogCreateInputDto, LogOutputCustomDto, LogOutputDto } from '@/usecases/contracts';
import { HttpResponse, LogControllerInterface } from '../contracts';
import { create, ok } from '../helpers';

export class LogController implements LogControllerInterface {
    constructor(
        private readonly createLogUseCase: CreateLogUseCase,
        private readonly filterLogsUseCase: FilterLogsUseCase,
        private readonly findOneLogByIdUseCase: FindOneLogByIdUseCase
    ) {}

    async create(input: LogCreateInputDto): Promise<HttpResponse<LogOutputCustomDto<LogOutputDto>>> {
        return create(await this.createLogUseCase.execute(input));
    }

    async filter(): Promise<HttpResponse<LogOutputCustomDto<LogOutputDto[]>>> {
        return ok(await this.filterLogsUseCase.execute());
    }

    async findOneById(id: string): Promise<HttpResponse<LogOutputCustomDto<LogOutputDto>>> {
        return ok(await this.findOneLogByIdUseCase.execute(id));
    }
}