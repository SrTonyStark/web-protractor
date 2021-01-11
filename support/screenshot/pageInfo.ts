import { PageChunk } from './pageChunk';

export interface PageInfo {
  pageHeight: number;
  viewWidth: number;
  viewHeight: number;
  blocks: number;
  pageChunks: PageChunk[];
}
