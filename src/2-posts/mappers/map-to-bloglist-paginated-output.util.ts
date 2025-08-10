import { WithId } from 'mongodb';
import { Post } from '../types/post';
import { PostListPaginatedOutput } from '../router/output/blog-list-paginated.output';

export function mapToPostListPaginatedOutput(
  posts: WithId<Post>[],
  meta: { pageNumber: number; pageSize: number; totalCount: number },
): PostListPaginatedOutput {
  return {
    pagesCount: Math.ceil(meta.totalCount / meta.pageSize),
    page: meta.pageNumber,
    pageSize: meta.pageSize,
    totalCount: meta.totalCount,

    items: posts,
  };
}
