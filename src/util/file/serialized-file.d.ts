import { FileType } from '@util/file/file.model';

export interface SerializedFile {
  name: string;
  type: FileType;
  size: number;
  ext?: string;
  children?: SerializedFile[];
  content?: string;
}
