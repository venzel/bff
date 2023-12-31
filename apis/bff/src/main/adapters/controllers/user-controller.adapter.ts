import { UserControllerInterface } from '@/presentation/contracts';
import { Request, Response } from 'express';
import { dataFindOneByEmail, dataFindOneById, dataFindAll } from '../../helpers';

export const listUsersControllerAdapter = (controller: UserControllerInterface) => {
    return async (req: Request, res: Response) => {
        const { device } = dataFindAll(req.headers);

        const httpResponse = await controller.findAll(device);

        res.status(httpResponse.statusCode).json(httpResponse.body);
    };
};

export const findOneUserByEmailControllerAdapter = (controller: UserControllerInterface) => {
    return async (req: Request, res: Response) => {
        const { device, email } = dataFindOneByEmail(req.headers, req.params);

        const httpResponse = await controller.findOneByEmail(device, email);

        res.status(httpResponse.statusCode).json(httpResponse.body);
    };
};

export const findOneUserByIdControllerAdapter = (controller: UserControllerInterface) => {
    return async (req: Request, res: Response) => {
        const { device, id } = dataFindOneById(req.headers, req.params);

        const httpResponse = await controller.findOneById(device, id);

        res.status(httpResponse.statusCode).json(httpResponse.body);
    };
};
