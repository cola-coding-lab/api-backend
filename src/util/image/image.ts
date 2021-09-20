import { PATHS } from '@config/environment';
import { SerializedFile } from '@util/file';
import { FileType } from '@util/file/file.model';
import path from 'path';
import sharp, { ResizeOptions } from 'sharp';

const ASSETS = path.join(PATHS.ASSETS, 'img');
const baseImg = path.join(ASSETS, 'pwa-base-icon_512.png');

class Size {
  public static readonly '48x48': ResizeOptions = { width: 48, height: 48 };
  public static readonly '72x72': ResizeOptions = { width: 72, height: 72 };
  public static readonly '96x96': ResizeOptions = { width: 96, height: 96 };
  public static readonly '144x144': ResizeOptions = { width: 144, height: 144 };
  public static readonly '192x192': ResizeOptions = { width: 192, height: 192 };
  public static readonly '256x256': ResizeOptions = { width: 256, height: 256 };
  public static readonly '384x384': ResizeOptions = { width: 384, height: 384 };
  public static readonly '512x512': ResizeOptions = { width: 512, height: 512 };
}

interface Image {
  buffer: Buffer;
  options: ResizeOptions;
}

async function resize(img: string | Buffer, options: ResizeOptions = Size['144x144']): Promise<Image> {
  const buffer = await sharp(img)
    .resize(options)
    .png()
    .toBuffer();
  return {
    buffer,
    options,
  };
}

export async function getPwaImages(original: string | Buffer = baseImg): Promise<SerializedFile> {
  const imgBuffers: Image[] = await Promise.all([
    resize(original, Size['48x48']),
    resize(original, Size['72x72']),
    resize(original, Size['96x96']),
    resize(original, Size['144x144']),
    resize(original, Size['192x192']),
    resize(original, Size['256x256']),
    resize(original, Size['384x384']),
    resize(original, Size['512x512']),
  ],
  );

  const dir: SerializedFile = {
    name: 'img',
    size: 8,
    type: FileType.DIR,
  };

  dir.children = imgBuffers.map((img: Image) => {
    return {
      name: `icons-${img.options.width}.png`,
      size: img.buffer.length,
      type: FileType.FILE,
      ext: '.png',
      content: img.buffer.toString('base64'),
    };
  });
  return dir;
}
