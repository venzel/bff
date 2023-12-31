import 'dotenv/config';

enum Type {
    NUMBER = 'number',
    BOOLEAN = 'boolean',
}

type MapType = {
    [key in Type]: any;
};

const parseTo = (value: string, type: Type) => {
    try {
        const map: MapType = {
            number: Number(value),
            boolean: value === 'true' ? true : false,
        };

        return map[type];
    } catch (err) {
        throw err;
    }
};

const { env } = process;

export const envs = {
    api: {
        name: env.API_NAME,
        ambient: env.API_AMBIENT,
        port: env.API_PORT,
        tokenSecret: env.API_TOKEN_SECRET,
        baseUrl: env.API_BASE_URL,
        version: env.API_VERSION,
        hateosActivated: env.API_HATEOS_ACTIVATED ? parseTo(env.API_HATEOS_ACTIVATED, Type.BOOLEAN) : null,
    },
    mongodb: {
        host: env.MONGODB_HOST,
        port: env.MONGODB_PORT,
        user: env.MONGODB_USER,
        password: env.MONGODB_PASSWORD,
        name: env.MONGODB_NAME,
    },
    axios: {
        retryQtty: env.AXIOS_RETRY_ATTEMPTS ? parseTo(env.AXIOS_RETRY_ATTEMPTS, Type.NUMBER) : null,
        baseDelay: env.AXIOS_BASE_DELAY ? parseTo(env.AXIOS_BASE_DELAY, Type.NUMBER) : null,
        maxDelay: env.AXIOS_MAX_DELAY ? parseTo(env.AXIOS_MAX_DELAY, Type.NUMBER) : null,
    },
    agentKeepAlive: {
        maxSockets: env.AGENTKEEPALIVE_MAX_SOCKETS
            ? parseTo(env.AGENTKEEPALIVE_MAX_SOCKETS, Type.NUMBER)
            : null,
        maxFreeSockets: env.AGENTKEEPALIVE_MAX_FREE_SOCKETS
            ? parseTo(env.AGENTKEEPALIVE_MAX_FREE_SOCKETS, Type.NUMBER)
            : null,
        timeout: env.AGENTKEEPALIVE_TIMEOUT ? parseTo(env.AGENTKEEPALIVE_TIMEOUT, Type.NUMBER) : null,
        freeSocketTimeout: env.AGENTKEEPALIVE_FREE_SOCKET_TIMEOUT
            ? parseTo(env.AGENTKEEPALIVE_FREE_SOCKET_TIMEOUT, Type.NUMBER)
            : null,
    },
};

function flatten(obj: Record<string, any>, parentKey = ''): Record<string, any> {
    let envsAux: Record<string, any> = {};

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const newKey = parentKey ? `${parentKey}.${key}` : key;

            if (typeof obj[key] === 'object' && obj[key] !== null) {
                Object.assign(envsAux, flatten(obj[key], newKey));
            } else {
                envsAux[newKey] = obj[key];
            }
        }
    }

    return envsAux;
}

export const envsValidate = () => {
    const ok: any[] = [];
    const error: any[] = [];

    Object.entries(flatten(envs)).forEach(([key, value]) => {
        if (value !== null) {
            ok.push({ key, value });
        } else {
            error.push({ key, value });
        }
    });

    console.log('Carregando variáveis de ambiente...');

    ok.forEach(({ key, value }) => {
        console.log(`[ok] ${key} -> ${value}`);
    });

    if (error.length) {
        console.log('\nCheck var(s) in file .env:');

        error.forEach(({ key, value }) => {
            console.log(`[**] ${key} -> ${value}`);
        });

        console.log('----------------------------------------');
        throw 'Invalid envs';
    }

    console.log('----------------------------------------');
};
