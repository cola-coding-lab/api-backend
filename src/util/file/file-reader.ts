import { PATHS } from '@config/environment';
import { File } from '@util/file/file.model';
import { LogFactory } from '@util/logger';
import * as fs from 'fs';
import path from 'path';

const LOGGER = LogFactory('FileReader');

const CACHE = new Map<string, File>();

export function FileTree(start = '', noCache = false): File {
  const dir = getAbsolutePath(start);
  if (fs.existsSync(dir) && fs.lstatSync(dir).isDirectory()) {
    const existing = CACHE.get(dir);
    if (!noCache && existing) {
      LOGGER.debug(`get cached ${start}`);
      return existing;
    }
    const file = readRecursive(new File(dir));
    if (noCache) { return file; }
    CACHE.set(dir, file);
    return CACHE.get(dir);
  }

  return undefined;
}

function getAbsolutePath(p: string, base = PATHS.ASSETS): string {
  const absolute = path.isAbsolute(p) ? p : path.join(base, p);
  if (fs.lstatSync(absolute).isSymbolicLink()) {
    const target = fs.readlinkSync(absolute);
    return getAbsolutePath(target);
  }
  return absolute;
}

function readRecursive(base: File): File {
  if (base.isDirectory()) {
    const files = fs.readdirSync(base.absolutePath);
    files.forEach(fileName => {
      const filePath = path.join(base.absolutePath, fileName);
      const file = new File(filePath);
      if (file.isDirectory()) {
        readRecursive(file);
      }
      file.parent = base;
      base.addChild(file);
    });
    return base;
  } else {
    return base;
  }
}
