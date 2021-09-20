import { RESPONSE_CODES } from '@config/constants';
import { BaseRouter, Validators } from '@routes/base.router';
import { File, FileTree, SerializedFile } from '@util/file';
import { TEMPLATE_EXT_REGEXP, TemplateFile } from '@util/file/template-file';
import { getPwaImages } from '@util/image';
import { errorResponse, ResponseError } from '@util/response';
import { Serializable } from '@util/serialize';
import { createZip } from '@util/zip';
import { Request, Response } from 'express';

export enum Place {
  generated = 'generated',
  template = 'template',
}

export class PwaRouter extends BaseRouter {
  constructor(validators: Validators) {super(validators);}

  private static getFileFrom(place: Place): File {
    return FileTree(`${place}/pwa`, true);
  }

  protected async getAll(req: Request, res: Response): Promise<void> {
    const zips = PwaRouter.getFileFrom(Place.generated)?.serialize();
    res.json(zips?.children || []);
  }

  protected async getByKey(req: Request, res: Response): Promise<void> {
    const zips = PwaRouter.getFileFrom(Place.generated);
    const zip = zips?.children?.find(z => z.name === req.params.key);

    if (zip) { return res.download(zip.absolutePath); }
    await errorResponse(req, res,
      [new ResponseError(RESPONSE_CODES.NOT_FOUND, `could not find pwa with name [${req.params.key}]`)],
      RESPONSE_CODES.NOT_FOUND);
  }

  protected async post(req: Request, res: Response): Promise<void> {
    const pwa = PwaRouter.getFileFrom(Place.template);
    const compiled = pwa?.children.map(function f(file: File): Serializable<SerializedFile> {
      if (file?.isDirectory()) {
        const copy = file.copy;
        copy.children = copy.children.map(f) as File[];
        return copy;
      }
      if (TEMPLATE_EXT_REGEXP.test(file.ext || '')) {
        return new TemplateFile(file, req.body);
      }
      return file;
    }).map(m => m.serialize(true));

    if (compiled) {
      const image = req.body.pwa_image ? Buffer.from(req.body.pwa_image, 'base64') : undefined;
      compiled.push(await getPwaImages(image));

      await createZip(compiled, `pwa/${req.body.pwa_title}.zip`);

      res.json(compiled);

    } else {
      await errorResponse(req, res,
        [new ResponseError(RESPONSE_CODES.SERVER_ERROR, 'could not create pwa')], RESPONSE_CODES.SERVER_ERROR);
    }
  }
}
