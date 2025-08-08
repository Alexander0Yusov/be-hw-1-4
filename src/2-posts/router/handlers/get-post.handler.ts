import { Request, Response } from 'express';
import { createErrorMessages } from '../../../core/utils/error.utils';
import { HttpStatus } from '../../../core/types/HttpStatus';
import { postsRepository } from '../../repository/posts.repository';
import { mapToPostViewModel } from '../../mappers/map-to-blog-view-model.util';

export async function getPostHandler(req: Request, res: Response) {
  try {
    const post = await postsRepository.findById(req.params.id);

    if (!post) {
      res
        .status(HttpStatus.NotFound)
        .send(
          createErrorMessages([{ field: 'id', message: 'Post not found' }]),
        );
      return;
    }

    res.status(HttpStatus.Ok).send(mapToPostViewModel(post));
  } catch (error: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
