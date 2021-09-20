import { ExplorerDescription } from './description-file.d';

export function isDescriptionFile(arg: ExplorerDescription): arg is ExplorerDescription {
  return arg && arg.title && typeof (arg.title) === 'string'
    && arg.name && typeof (arg.name) === 'string'
    && arg.description && typeof (arg.description) === 'string';
}
