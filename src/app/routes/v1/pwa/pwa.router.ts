import { RESPONSE_CODES } from '@config/constants';
import { BaseRouter, Validators } from '@routes/base.router';
import { File, FileTree, SerializedFile } from '@util/file';
import { TEMPLATE_EXT_REGEXP, TemplateFile } from '@util/file/template-file';
import { getPwaImages } from '@util/image';
import { errorResponse, ResponseError } from '@util/response';
import { Serializable } from '@util/serialize';
import { createZip } from '@util/zip';
import { Request, Response } from 'express';
import { v4 } from 'uuid';
import { save2Public } from '@util/pwa';
import { Validate } from '@middleware/validation';

export enum Place {
  generated = 'generated',
  template = 'template',
}

export class PwaRouter extends BaseRouter {
  constructor(validators: Validators) {super(validators);}

  private static getFileFrom(place: Place): File {
    return FileTree(`${place}/pwa`, true);
  }

  private static async addPwaImage(base64?: string): Promise<SerializedFile | undefined> {
    const image = base64 ? Buffer.from(base64, 'base64') : undefined;
    return getPwaImages(image);
  }

  protected async routes(_validators?: Validators): Promise<void> {
    super.routes(_validators);
    this.router.put('/', Validate(_validators.put), this.put);
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
      [ new ResponseError(RESPONSE_CODES.NOT_FOUND, `could not find pwa with name [${req.params.key}]`) ],
      RESPONSE_CODES.NOT_FOUND);
  }

  protected async post(req: Request, res: Response): Promise<void> {
    if (req.query.zip !== undefined) {
      await this.zip(req, res);
    } else {
      await this.publish(req, res);
    }
  }

  protected async put(req: Request, res: Response): Promise<void> {
    const uuid = req.params.key || v4();
    const data = { base_href: `/public/${uuid}/`, ...req.body };
    const files = await this.compile(data);
    if (files) {
      await save2Public(files, { uuid });
      res.setHeader('Location', `${req.protocol}://${req.header('host')}${data.base_href}`);
      res.json(files);
    } else {
      await errorResponse(req, res, [ new ResponseError(RESPONSE_CODES.SERVER_ERROR, 'could not create pwa') ], RESPONSE_CODES.SERVER_ERROR);
    }
  }

  private async publish(req: Request, res: Response): Promise<void> {
    req.params.key = v4();
    await this.put(req, res);
  }

  private async zip(req: Request, res: Response): Promise<void> {
    const files = await this.compile({ base_href: '/', ...req.body });
    if (files) {
      await createZip(files, `pwa/${req.body.pwa_title}.zip`);
      res.json(files);
    } else {
      await errorResponse(req, res,
        [ new ResponseError(RESPONSE_CODES.SERVER_ERROR, 'could not create pwa') ], RESPONSE_CODES.SERVER_ERROR);
    }
  }

  private async compile(data: any): Promise<SerializedFile[]> {
    const pwa = PwaRouter.getFileFrom(Place.template);
    const files = pwa?.children.map(function f(file: File): Serializable<SerializedFile> {
      if (file?.isDirectory()) {
        const copy = file.copy;
        copy.children = copy.children.map(f) as File[];
        return copy;
      }
      if (TEMPLATE_EXT_REGEXP.test(file.ext || '')) {
        return new TemplateFile(file, data);
      }
      return file;
    }).map(m => m.serialize(true));
    files?.push(await PwaRouter.addPwaImage(data.pwa_image));

    return files || [];
  }
}
