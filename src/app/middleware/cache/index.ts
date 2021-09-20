import { LogFactory } from '@util/logger';
import { NextFunction, Request, Response } from 'express';

const LOGGER = LogFactory.getLogger('cache-control');
const MAX_CACHE = 1000 * 60 * 5; // 5 minutes

interface ICache {
  noCache: boolean;
}

export interface CacheRequest extends Request {
  caching: ICache;
}

let lastCache: Date;

export async function CacheControl(req: CacheRequest, res: Response, next: NextFunction): Promise<void> {
  const cc = req.header('cache-control');
  req.caching = {
    noCache: cacheExpired(cc),
  };
  LOGGER.debug(JSON.stringify(req.caching));
  next();
}

function cacheExpired(ccHeader: string): boolean {
  if (!lastCache
    || lastCache.getTime() < new Date(lastCache.getTime() + MAX_CACHE).getTime()
    || ccHeader?.toLowerCase() === 'no-cache') {
    lastCache = new Date();
    return true;
  }
  return false;
}
