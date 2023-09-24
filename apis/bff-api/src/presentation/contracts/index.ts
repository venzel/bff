import { Device, HealthzOutputDto, UserOutputDto } from '@/usecases/contracts';

export type HttpResponse<T = any> = {
    statusCode: number;
    body: T;
};

export interface HealthzControllerInterface {
    healthz: () => Promise<HttpResponse<HealthzOutputDto>>;
}

export interface UserControllerInterface {
    findOneById: (device: Device, id: number) => Promise<HttpResponse<UserOutputDto>>;
    findOneByEmail: (device: Device, email: string) => Promise<HttpResponse<UserOutputDto>>;
    list: (device: Device) => Promise<HttpResponse<UserOutputDto[]>>;
}
