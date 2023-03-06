/* eslint-disable linebreak-style */
import { BaseRouter, Validators } from '@routes/base.router';
import { Request, Response } from 'express';
import { requestDetails } from '@util/request';
import { getWorkshopData } from '@routes/v1/vcl/workshops/workshops';
import { errorResponse, ResponseError } from '@util/response';
import { RESPONSE_CODES } from '@config/constants';
import path from 'path';
import { PATHS } from '@config/environment';
export class WorkshopsRouter extends BaseRouter {
  constructor(validators?: Validators) {
    super(validators);
  }

  protected async getAll(req: Request, res: Response): Promise<void> {
    const workshopData = getWorkshopData(req);
    this.format(req, res, {
      plain: '',
      json: { WorkshopOverview: workshopData.WorkshopOverview, ...requestDetails(req) },
    });
  }

  protected async routes(_validators?: Validators): Promise<void> {
    super.routes(_validators);
    this.router.get('/:key/assets*', (req: Request, res: Response) => {
      const file = path.join(PATHS.ASSETS, 'workshops', req.params.key, req.params[0]);
      res.download(file);
    });
  }

  protected async getByKey(req: Request, res: Response): Promise<void> {
    const id = req.params.key;
    const workshopData = getWorkshopData(req);
    const workshopDetails = workshopData.WorkshopDetails;
    const workshop = workshopDetails?.find((ws) => ws.id === id);

    if (workshop) {
      return this.format(req, res, {
        plain: '',
        json: { ...workshop, ...requestDetails(req) },
      });
    }
    await errorResponse(
      req,
      res,
      [new ResponseError(RESPONSE_CODES.NOT_FOUND, `could not find workshop with id [${id}]`)],
      RESPONSE_CODES.NOT_FOUND
    );
  }
}
