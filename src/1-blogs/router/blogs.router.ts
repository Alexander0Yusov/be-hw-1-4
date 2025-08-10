import { Router } from 'express';
import { idValidationMiddleware } from '../../core/middlewares/validation/id-validation.middleware';
import { errorsCatchMiddleware } from '../../core/middlewares/validation/errors-catch.middleware';
import { superAdminGuardMiddleware } from '../../core/middlewares/validation/super-admin-guard.middleware';
import { dtoValidationMiddleware } from '../validation/dto-validation.middleware';
import {
  deleteBlogHandler,
  getBlogHandler,
  getBlogListHandler,
  postBlogHandler,
  putBlogHandler,
} from './handlers';
import { paginationAndSortingValidation } from '../../core/middlewares/validation/query-pagination-sorting.validation-middleware';
import { BlogSortField } from './input/blog-sort-field';
import { query } from 'express-validator';
import { PostSortField } from '../../2-posts/router/input/post-sort-field';
import { getPostListByBlogIdHandler } from './handlers/get-post-list-by-blog-id.handler';
import { postPostByBlogIdHandler } from './handlers/post-post-by-blog-id.handler';

export const blogsRouter = Router({});

blogsRouter
  .get(
    '',
    paginationAndSortingValidation(BlogSortField),
    query('searchNameTerm').optional().trim(),
    errorsCatchMiddleware,
    getBlogListHandler,
  )

  .post(
    '',
    superAdminGuardMiddleware,
    dtoValidationMiddleware,
    errorsCatchMiddleware,
    postBlogHandler,
  )

  //new route
  .get(
    '/:id/posts',
    idValidationMiddleware,
    paginationAndSortingValidation(PostSortField),
    errorsCatchMiddleware,
    getPostListByBlogIdHandler,
  )

  //new route
  .post(
    '/:id/posts',
    superAdminGuardMiddleware,
    idValidationMiddleware,
    dtoValidationMiddleware,
    errorsCatchMiddleware,
    postPostByBlogIdHandler, // new
  )

  .get('/:id', idValidationMiddleware, errorsCatchMiddleware, getBlogHandler)

  .put(
    '/:id',
    superAdminGuardMiddleware,
    idValidationMiddleware,
    dtoValidationMiddleware,
    errorsCatchMiddleware,
    putBlogHandler,
  )

  .delete(
    '/:id',
    superAdminGuardMiddleware,
    idValidationMiddleware,
    errorsCatchMiddleware,
    deleteBlogHandler,
  );
