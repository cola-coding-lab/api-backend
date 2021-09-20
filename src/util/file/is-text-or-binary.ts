import binaryExtensions from 'binaryextensions';
import path from 'path';
import textExtensions from 'textextensions';

/**
 * based on https://github.com/bevry/istextorbinary
 * own implementation because of problems with nodemon
 */


export function isText(fileName: string): boolean {
  const parts = path.basename(fileName).split('.').reverse();
  for (const extension of parts) {
    if (textExtensions.indexOf(extension) !== -1) {
      return true;
    }
    if (binaryExtensions.indexOf(extension) !== -1) {
      return false;
    }
  }
  return false;
}

export function isBinary(fileName: string): boolean {
  return !isText(fileName);
}
