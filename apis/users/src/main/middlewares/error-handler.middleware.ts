import { Errback, NextFunction, Request, Response } from 'express';
import { AppError, errorMessageAdapter } from '../errors';
import { envs } from '../configs';

export class ErrorHandlerMiddleware {
    async handle(err: Errback, req: Request, res: Response, _next: NextFunction) {
        if (err instanceof AppError) {
            return res.status(err.statusCode).json({
                statusCode: err.statusCode,
                message: err.message,
            });
        }

        if (envs.api.ambient === 'development') {
            return res.status(500).json(await errorMessageAdapter(err, req));
        }

        return res.status(500).json({
            statusCode: 500,
            message: 'Internal server error, contact the administrator',
        });
    }
}
