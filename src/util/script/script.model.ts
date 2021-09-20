import { File } from '@util/file';

export interface IScript {
  src?: string;
  innerHTML? : string;
}

export interface ScriptFile {
  script: IScript;
  filename: string;
  filetype: ScriptFileType;
  isModule?: boolean;
  isActive?: boolean;
  isModified?: boolean;
}

// http://www.iana.org/assignments/media-types/media-types.xhtml
export enum ScriptFileType {
  javascript = 'application/javascript',
  json = 'application/json',
  plain = 'text/plain',
}

export class Script implements ScriptFile {
  public readonly filename: string;
  public readonly filetype: ScriptFileType;
  public readonly script: IScript;
  public readonly isActive?: boolean;
  public readonly isModified?: boolean;
  public readonly isModule?: boolean;

  constructor(file: File) {
    this.filename = file.name;
    this.isActive = file.name.startsWith('main') || file.name.startsWith('index');
    this.script = {
      innerHTML: file.content,
    };
    this.filetype = Script.getFileType(file.ext);
  }

  public static getFileType(extension: string): ScriptFileType {
    switch (extension.replace('.', '').toLowerCase()) {
    case 'js':
      return ScriptFileType.javascript;
    case 'json':
      return ScriptFileType.json;
    default:
      return ScriptFileType.plain;
    }
  }
}
