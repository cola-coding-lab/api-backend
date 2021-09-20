export interface ExplorerDescription {
  title: string;
  name: string;
  description: string;
  files?: ExplorerFile[];
}

export interface ExplorerFile {
  filename: string;
  isHidden: boolean;
}
