import {
    app,
    bannerConfig,
    envsValidate,
    errorConfig,
    mongodbConfig,
    routesConfig,
    serverConfig,
} from './configs';

export class MainBuild {
    initBanner() {
        bannerConfig();
        return this;
    }

    initEnvs() {
        envsValidate();
        return this;
    }

    initLogger() {
        return this;
    }

    async initDB() {
        await mongodbConfig();
        return this;
    }

    async initRoutes() {
        await routesConfig(app);
        return this;
    }

    initErrorMiddleware() {
        errorConfig(app);
        return this;
    }

    initServer() {
        serverConfig(app);
        return app;
    }
}
