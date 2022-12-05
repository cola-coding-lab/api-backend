import { Request } from 'express';

export function requestUri(req: Request): RequestUri {
  const protocol = req.get('x-forwarded-proto') || req.get('x-forwarded-port') === '443' ? 'https' : req.protocol;
  const host = req.get('x-forwarded-host') || req.get('x-forwarded-server') || req.get('host');
  const location = req.get('x-location') || ''; // needs to be set from reverse proxy!
  const baseUrl = req.baseUrl || '';
  const path = req.path || '';

  return {
    protocol,
    host,
    location,
    baseUrl,
    path,
    url: `${protocol}://${host}${location}${baseUrl}${path}`,
  };
}

/**
 * @param req [Express `Request`](https://expressjs.com/en/api.html#req) object
 * @returns `RequestDetails`, details of the request to use in response
 */
export function requestDetails(req: Request): RequestDetails {
  const uri = requestUri(req);
  return {
    url: uri.url,
    method: req.method,
    body: req.body && Object.keys(req.body).length > 0 ? req.body : undefined,
    query: req.query && Object.keys(req.query).length > 0 ? req.query : undefined,
    timestamp: new Date().toUTCString(),
  };
}

export type RequestUri = {
  protocol: string,
  host: string,
  location: string,
  baseUrl: string,
  path: string,
  url: string,
}

export type RequestDetails = {
  /** full requested url (e.g. `http://localhost:1234/test?foo=bar) */
  url: string,
  /** request method (GET, POST, PUT, ...) */
  method: string,
  /** request body if given */
  body?: Record<string, unknown>,
  /** request query if given */
  query?: Record<string, unknown>,
  /** (current) timestamp */
  timestamp: string
};
