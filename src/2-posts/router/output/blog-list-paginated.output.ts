import { WithId } from 'mongodb';
import { Post } from '../../types/post';

export type PostListPaginatedOutput = {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: WithId<Post>[];
};
