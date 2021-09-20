import { File, FileType } from '@util/file/file.model';
import { SerializedFile } from '@util/file/serialized-file';
import { Serializable } from '@util/serialize';
import * as Handlebars from 'handlebars';
import path from 'path';

export const TEMPLATE_EXT_REGEXP = new RegExp('(\\.hbs|\\.handlebars)$', 'i');

export class TemplateFile extends Serializable<SerializedFile> implements SerializedFile {
  public readonly content: string;
  public readonly ext: string;
  public readonly name: string;
  public readonly size: number;
  public readonly type: FileType;

  constructor(original: File, data: unknown) {
    super();
    this.name = original.name.replace(TEMPLATE_EXT_REGEXP, '');
    this.ext = path.extname(this.name);
    this.type = original.type;

    const template = Handlebars.compile(original.content);
    this.content = template(data);

    this.size = this.content.length;
  }

  serialize(): SerializedFile {
    return this;
  }
}
