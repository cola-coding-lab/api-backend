import { CacheRequest } from '@middleware/cache';
import { BaseRouter, Validators } from '@routes/base.router';
import { File, FileTree, isDescriptionFile } from '@util/file';
import { Response } from 'express';
import { ExplorerDescription } from '@util/file/description-file';
import { v5 } from 'uuid';

// Todo: Extract to shared-types
export interface Project {
  id: string;
  name: string;
  title: string;
  description: string;
  files: EditorFile[];
  directories?: Directory[];
}

export type FileType = 'text/javascript' | 'text/css' | 'text/html' | 'text/plain';

export interface EditorFile extends FSElement {
  type: FileType;
  content: string;
}

export interface Directory extends FSElement {
  children: number[];
}

interface FSElement {
  id: number;
  name: string;
}

export class ProjectsRouter extends BaseRouter {
  private projects: Project[];
  private base: File;

  constructor(private root: string, noCache = true, validators?: Validators) {
    super(validators);
    this.init(noCache);
  }

  public init(noCache = true): void {
    this.base = FileTree(this.root, noCache);
    this.projects = this.createProjects();
  }

  protected async getAll(req: CacheRequest, res: Response): Promise<void> {
    if (req.caching?.noCache) { this.init(true); }
    res.json(this.projects);
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

  private createProjects(): Project[] {
    if (!this.base) { return; }
    const GUID = v5(`${this.base.name}/${this.base.inode}`, v5.DNS);

    function isDescription(file: File, parent: File): boolean {
      return !!(file.ext?.match(/json$/i) && file.name.match(parent.name));
    }

    function parseFiles(children: File[], projectRoot: File): EditorFile[] {
      return children.filter(child => !isDescription(child, projectRoot) && child.isFile()).map<EditorFile>(file => {
        return {
          id: file.inode,
          name: file.name,
          content: file.content,
          type: getFileType(file),
        };
      });
    }

    function parseDirectories(children: File[]): Directory[] {
      return children.filter(child => child.isDirectory()).map<Directory>(dir => {
        return {
          id: dir.inode,
          name: dir.name,
          children: dir.children.map(child => child.inode),
        };
      });
    }

    return this.base.children?.map<Project>(projectRoot => {
      const description = projectRoot.children?.find(child => isDescription(child, projectRoot));
      if (!description) { return; }
      const projectDescription = JSON.parse(description.content) as ExplorerDescription;
      let files: EditorFile[] = parseFiles(projectRoot.children, projectRoot);
      let dirs: Directory[] = parseDirectories(projectRoot.children);
      projectRoot.children.filter(child => child.isDirectory()).forEach(function filesInDir(dir) {
        files = [ ...files, ...parseFiles(dir.children, projectRoot) ];
        dirs = [ ...dirs, ...parseDirectories(dir.children) ];
        dir.children.filter(child => child.isDirectory()).forEach(filesInDir);
      });
      return {
        ...projectDescription,
        id: v5(projectDescription.name, GUID),
        files,
        dirs: dirs.length > 0 ? dirs : undefined,
      };
    });
  }
}

function getFileType(file: File): FileType {
  if (file.isDirectory()) { throw Error('Directory is an invalid File'); }
  switch (file.ext.toLowerCase()) {
    case '.js':
    case '.jsx':
      return 'text/javascript';
    case '.css':
      return 'text/css';
    case '.htm':
    case '.html':
    case '.xhtml':
      return 'text/html';
    default:
      return 'text/plain';
  }
}
