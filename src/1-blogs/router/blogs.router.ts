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

export const blogsRouter = Router({});

blogsRouter
  .get('', getBlogListHandler)
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
