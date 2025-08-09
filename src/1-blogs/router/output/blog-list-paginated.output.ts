import { WithId } from 'mongodb';
import { Blog } from '../../types/blog';

export type BlogListPaginatedOutput = {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: WithId<Blog>[];
};
