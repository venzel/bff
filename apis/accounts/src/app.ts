import { MainBuild } from './main';

const main = new MainBuild();

main.initBanner()
    .initEnvs()
    .initCheckIntegrations()
    .then((res) =>
        res.initDB().then((res) =>
            res
                .initRequestMiddleware()
                .initRoutes()
                .then((res) => res.initErrorMiddleware().initServer())
        )
    );
