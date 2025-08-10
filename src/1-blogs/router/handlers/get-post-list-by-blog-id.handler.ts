import { Request, Response } from 'express';
import { blogsService } from '../../application/blogs.service';
import { WithId } from 'mongodb';
import { Blog } from '../../types/blog';
import { postsService } from '../../../2-posts/application/posts.service';
import { setDefaultSortAndPaginationIfNotExist } from '../../../core/helpers/set-default-sort-and-pagination';
import { matchedData } from 'express-validator';
import { HttpStatus } from '../../../core/types/HttpStatus';
import { mapToPostListPaginatedOutput } from '../../../2-posts/mappers/map-to-bloglist-paginated-output.util';

export async function getPostListByBlogIdHandler(req: Request, res: Response) {
  try {
    // берем айди из сервиса
    // подтверждаем существование блога
    const blog: WithId<Blog> = await blogsService.findByIdOrFail(req.params.id);

    if (!blog) {
      // Error ...
    }

    // делаем запрос за постами в которых блогАйди данный
    const queryData = matchedData(req, { locations: ['query'] });
    const queryInput = setDefaultSortAndPaginationIfNotExist(queryData);

    const { items, totalCount } = await postsService.findMany(
      req.params.id,
      queryInput as any,
    );

    // мапим и возвращаем
    const postsOutput = mapToPostListPaginatedOutput(items, {
      pageNumber: queryInput.pageNumber,
      pageSize: queryInput.pageSize,
      totalCount,
    });

    res.send(postsOutput);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
