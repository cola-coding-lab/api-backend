import { BaseRouter, Validators } from '@routes/base.router';
import { CacheControl } from '@middleware/cache';
import { WorkshopsRoute } from '@routes/v1/vcl/workshops';

export class VCLRouter extends BaseRouter {
  constructor(validators?: Validators) {
    super(validators);
  }

  protected async routes(): Promise<void> {
    this.router.use('/workshops', CacheControl, WorkshopsRoute.router);
  }
}
