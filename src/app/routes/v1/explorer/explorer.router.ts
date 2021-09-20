import { CacheRequest } from '@middleware/cache';
import { BaseRouter, Validators } from '@routes/base.router';
import { File, FileTree, isDescriptionFile } from '@util/file';
import { Script, ScriptFile } from '@util/script';
import { Response } from 'express';

export class ExplorerRouter extends BaseRouter {
  private scripts: Map<string, { files: (ScriptFile | string)[], description?: string }>;
  private base: File;

  constructor(private root: string, noCache = true, validators?: Validators) {
    super(validators);
    this.scripts = new Map<string, { files: (ScriptFile | string)[]; description?: string }>();
    this.init(noCache);
  }

  public init(noCache = true): void {
    this.base = FileTree(this.root, noCache);
    this.appendScript(this.base);
  }

  protected async getAll(req: CacheRequest, res: Response): Promise<void> {
    if (req.caching?.noCache) { this.init(true); }
    const response: { [key: string]: { files: (ScriptFile | string)[], description?: string } } = {};
    Array.from(this.scripts.entries()).forEach(entry => {
      response[(entry[0] === 'file') ? '/' : entry[0]] = entry[1];
    });
    res.json(response);
  }

  private isDescription(dir: File, file: File): boolean {
    try {
      if (file.ext.toLowerCase() === '.json' && file.name.startsWith(dir.name)) {
        return isDescriptionFile(JSON.parse(file.content));
      }
    } catch (e) {
      this.logger.error(`error parsing file [${file.name}]`, e);
    }
  }

  private appendScript(dir: File): void {
    if (dir?.isDirectory()) {
      this.scripts.set(dir.name, { files: [] });
      dir.children.forEach(file => {
        if (file.isDirectory()) {
          this.scripts.get(dir.name).files.push(file.name);
          return this.appendScript(file);
        }
        if (this.isDescription(dir, file)) {
          return this.scripts.get(dir.name).description = JSON.parse(file.content);
        }
        this.scripts.get(dir.name).files.push(new Script(file));
      });
    }
  }
}
