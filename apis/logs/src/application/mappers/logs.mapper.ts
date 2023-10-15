import { LogsCreateInputDto, LogsOutputDto } from '@/application/contracts';
import { LogsEntityInterface } from '@/domain/@shared/contracts';
import { LogsFactory } from '@/domain/logs';

export class LogsMapper {
    static dataAnyToDto(data: any): LogsCreateInputDto {
        return {
            origin: data.origin,
            key: data.key,
            type: data.type,
            code: data.code || null,
            request: data.request,
            response: data.response,
        };
    }

    static dtoToEntity(input: LogsCreateInputDto): LogsEntityInterface {
        return LogsFactory.create(
            input.origin,
            input.key,
            input.type,
            input.code || null,
            input.request,
            input.response
        );
    }

    static entityToDto(entity: LogsEntityInterface): LogsOutputDto {
        return {
            id: entity.id,
            origin: entity.origin,
            key: entity.key,
            type: entity.type,
            code: entity.code || null,
            request: entity.request,
            response: entity.response,
            createdAt: entity.createdAt,
        };
    }

    static entitiesToDtoCollection(entities: LogsEntityInterface[]): LogsOutputDto[] {
        return entities.map((entity) => LogsMapper.entityToDto(entity));
    }

    static entityToDataAny(entity: LogsEntityInterface): any {
        return {
            origin: entity.origin,
            key: entity.key,
            type: entity.type,
            code: entity.code || null,
            request: entity.request,
            response: entity.response,
        };
    }

    static documentToEntity(doc: any): LogsEntityInterface {
        const entity = LogsFactory.create(doc.origin, doc.key, doc.type, doc.code, doc.request, doc.response);

        entity.setId(doc.id);
        entity.setCreatedAt(doc.createdAt);

        return entity;
    }

    static documentsToEntityCollection(docs: any[]): LogsEntityInterface[] {
        return docs.map((doc) => LogsMapper.documentToEntity(doc));
    }
}
