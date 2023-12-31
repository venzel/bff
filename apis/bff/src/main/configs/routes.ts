import { Express, Router } from 'express';
import { readdirSync } from 'fs';
import { join } from 'path';
import { envs } from '.';

export const routesConfig = async (app: Express): Promise<void> => {
    try {
        console.log('Carregando rotas...');

        const router = Router();

        app.use(envs.api.version, router);

        const filePath = join(__dirname, '../routes');

        for (const fileName of readdirSync(filePath)) {
            await (await import(`../routes/${fileName}`)).default(router);
        }
    } catch (e) {
        throw e;
    }
};
