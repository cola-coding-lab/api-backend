import { CacheControl } from '@middleware/cache';
import { BaseRouter, Validators } from '@routes/base.router';
import { ExplorerRoute } from '@routes/v1/explorer';
import { PwaRoute } from '@routes/v1/pwa';
import { requestDetails } from '@util/request';
import { Request, Response } from 'express';

export class V1Router extends BaseRouter {
  constructor(validators?: Validators) {
    super(validators);
  }

  protected async routes(): Promise<void> {
    this.router.use('/explorer', CacheControl, ExplorerRoute.router);
    this.router.use('/pwa', PwaRoute.router);
  }

  protected async getAll(req: Request, res: Response): Promise<void> {
    this.format(req, res, {
      plain: 'API V1',
      json: { api: 'V1', ...requestDetails(req) },
    });
  }
}
