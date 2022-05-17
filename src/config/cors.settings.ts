import { CustomError } from '@util/error';
import { Request } from 'express';
import { CORS_ALLOWED, NODE_ENV, PORT } from './environment';
import { CorsOptions } from 'cors';

/** CORS-Whitelist. Extend to your needs */
const whitelist = [
  `http://localhost:${PORT}`,
  'http://localhost:4200',
  'https://cola.fh-joanneum.at',
  ...CORS_ALLOWED,
];

if (NODE_ENV === 'development') {
  whitelist.push('*');
}

export const CorsOptionsDelegate = (req: Request,
  callback: (err: Error, options?: CorsOptions) => void,
): void => {
  const origin = req.header('origin') || '*';
  if (!origin || whitelist.indexOf(origin) >= 0) {
    return callback(null, {
      origin,
      methods: [ 'GET, HEAD', 'PUT' ],
      exposedHeaders: [ 'Location' ],
    });
  } else {
    const msg = `${origin} not allowed by CORS`;
    return callback(new CorsError(origin, msg));
  }
};

class CorsError extends CustomError {
  constructor(public origin: string, msg: string) {
    super(msg);
  }
}
