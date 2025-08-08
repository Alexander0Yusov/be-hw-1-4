import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/HttpStatus';
import { postsRepository } from '../../repository/posts.repository';
import { mapToPostViewModel } from '../../mappers/map-to-blog-view-model.util';

export async function getPostListHandler(req: Request, res: Response) {
  try {
    const posts = await postsRepository.findAll();
    const postsViewModel = posts.map(mapToPostViewModel);
    res.status(HttpStatus.Ok).send(postsViewModel);
  } catch (error: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
