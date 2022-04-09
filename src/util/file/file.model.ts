import { LogFactory } from '@util/logger/logger';
import { Serializable } from '@util/serialize';
import * as fs from 'fs';
import path from 'path';
import { FileTree } from './file-reader';
import { isBinary } from './is-text-or-binary';
import { SerializedFile } from './serialized-file';

export enum FileType {
  FILE = 'file',
  DIR = 'dir',
  LINK = 'link',
  UNKNOWN = 'unknown',
}

export class File extends Serializable<SerializedFile> implements SerializedFile {
  public readonly name: string;
  public readonly type: FileType;
  public readonly size: number;
  public readonly ext?: string;

  private readonly _parentName: string;
  private readonly _stats: fs.Stats;
  private readonly logger = LogFactory(this.constructor.name);

  constructor(private readonly _fullPath: string) {
    super();
    this._stats = fs.lstatSync(this._fullPath);
    this.name = path.basename(this._fullPath);
    this._parentName = path.dirname(this._fullPath);
    this.type = File.getFileType(this._stats);
    this.size = this._stats.size;
    if (this._stats.isDirectory()) {
      this._children = [];
    } else {
      this.ext = path.extname(this._fullPath);
    }
  }

  private _children?: File[];

  public get children(): File[] | undefined {
    return this._children;
  }

  public set children(newChildren: File[] | undefined) {
    this._children = newChildren;
  }

  private _parent: File;

  public get parent(): File {
    return this._parent;
  }

  public set parent(parent: File) {
    this._parent = parent;
  }

  public get copy(): File {
    if (this.isDirectory()) {
      return FileTree(this._fullPath, true);
    }
    return new File(this._fullPath);
  }

  private _content: string;

  public get content(): string {
    if (this.isDirectory()) return '';
    if (!this._content) {
      this.readContent();
    }
    return this._content || '';
  }

  public get absolutePath(): string {
    return this._fullPath;
  }

  private static getFileType(stats: fs.Stats): FileType {
    if (stats.isDirectory()) return FileType.DIR;
    if (stats.isSymbolicLink()) return FileType.LINK;
    if (stats.isFile()) return FileType.FILE;
    return FileType.UNKNOWN;
  }

  public isDirectory(): boolean {
    return this._stats.isDirectory();
  }

  public isFile(): boolean {
    return this._stats.isFile();
  }

  public addChild(file: File): void {
    if (this.children) {
      if (!this.children.find(child => child === file)) {
        this.children.push(file);
      }
    }
  }

  public serialize(withContent?: boolean): SerializedFile {
    const content = (this.isFile() && withContent) ? this.content : undefined;
    return {
      name: this.name,
      type: this.type,
      size: this.size,
      ext: this.ext,
      children: this.children?.map(c => c.serialize(withContent)),
      content,
    };
  }

  private readContent(): void {
    try {
      const contentBuffer = fs.readFileSync(this.absolutePath, isBinary(this.name) ? 'base64' : 'utf8');
      this._content = contentBuffer.toString();
    } catch (e) {
      this.logger.error(`could not read content of file ${this.name}`, e);
    }
  }
}
