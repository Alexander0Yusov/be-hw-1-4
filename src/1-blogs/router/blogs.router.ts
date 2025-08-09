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

export const blogsRouter = Router({});

blogsRouter
  .get(
    '',
    paginationAndSortingValidation(BlogSortField),
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
