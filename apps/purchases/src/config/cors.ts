import { AppError } from '@shared/errors/AppError';

const whitelist = process.env.APP_ORIGIN_WHITELIST.split(',');

export const corsOptions = {
  origin: (origin, callback) => {
    const isHostInWhitelist = whitelist.indexOf(origin) !== -1;
    const isDevelopmentEnvironment = process.env.NODE_ENV === 'dev';

    if (isHostInWhitelist || (!origin && isDevelopmentEnvironment)) {
      callback(null, true);
    } else {
      callback(new AppError('Origem não autorizada', 401));
    }
  },
};
