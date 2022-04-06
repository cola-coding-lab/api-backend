import { BaseRouter, Validators } from '@routes/base.router';
import { Request, Response } from 'express';
import { requestDetails } from '@util/request';
import { WorkshopDetailsMock, WorkshopOverviewMock } from '@routes/v1/vcl/workshops/workshops.mock';
import { errorResponse, ResponseError } from '@util/response';
import { RESPONSE_CODES } from '@config/constants';

export class WorkshopsRouter extends BaseRouter {
  constructor(validators?: Validators) {
    super(validators);
  }

  protected async getAll(req: Request, res: Response): Promise<void> {
    this.format(req, res, {
      plain: '',
      json: { WorkshopOverviewMock, ...requestDetails(req) }
    });
  }

  protected async getByKey(req: Request, res: Response): Promise<void> {
    const id = req.params.key;
    const workshop = WorkshopDetailsMock?.find(ws => ws.id === id);

    if (workshop) {
      return this.format(req, res, {
        plain: '',
        json: { ...workshop, ...requestDetails(req) }
      });
    }
    await errorResponse(req, res,
      [ new ResponseError(RESPONSE_CODES.NOT_FOUND, `could not find workshop with id [${id}]`) ],
      RESPONSE_CODES.NOT_FOUND);
  }
}
