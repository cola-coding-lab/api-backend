import { SerializedFile } from '@util/file';
import fs from 'fs';
import path from 'path';
import { PATHS } from '@config/environment';

export async function save2Public(files: SerializedFile[], options: { rootPath?: string, uuid?: string }): Promise<void> {
  if (!options.rootPath) { options.rootPath = path.join(PATHS.PUBLIC, options.uuid); }
  const { rootPath } = options;
  if (!fs.existsSync(rootPath)) { fs.mkdirSync(rootPath, { recursive: true }); }
  files.forEach((file) => {
    const filePath = path.join(rootPath, file.name);
    if (file.children) {
      save2Public(file.children, { rootPath: filePath });
    } else {
      const type = file.ext.match(/(png|jpe?g)/i) ? 'base64' : 'utf-8';
      fs.writeFileSync(filePath, file.content, type);
    }
  });
}

export function exists(uuid: string): boolean {
  return fs.existsSync(path.join(PATHS.PUBLIC, uuid));
}
