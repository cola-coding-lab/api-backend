import { PATHS } from '@config/environment';
import { SerializedFile } from '@util/file';
import { isBinary } from '@util/file/is-text-or-binary';
import { LogFactory } from '@util/logger';
import * as fs from 'fs';
import JSZip from 'jszip';
import path from 'path';

const OUTPUT = path.join(PATHS.ASSETS, 'generated');
const LOGGER = LogFactory.getLogger('zip');

export async function createZip(files: SerializedFile[], filePath: string): Promise<void> {
  const zip = new JSZip();
  files.forEach(file => {
    append(zip, file);
  });
  try {
    const zipData = await zip.generateAsync({ type: 'uint8array', compression: 'DEFLATE' });
    filePath = path.isAbsolute(filePath) ? filePath : path.join(OUTPUT, filePath);
    if (!fs.existsSync(path.dirname(filePath))) {
      LOGGER.info(`create ${path.dirname(filePath)}`);
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
    }
    fs.writeFile(filePath, Buffer.from(zipData), (err) => {
      if (err) {
        LOGGER.error(err.message, err);
      } else {
        LOGGER.info(`write ${filePath}`);
      }
    });
  } catch (e) {
    LOGGER.error(`error generate zip for ${path.basename(filePath)}`);
  }
}

function append(zipRoot: JSZip, file: SerializedFile): void {
  if (file.children) {
    return file.children.forEach(child => {
      append(zipRoot.folder(file.name), child);
    });
  }
  zipRoot.file(file.name, file.content || '', { base64: isBinary(file.name) });
}
