import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/HttpStatus';
import { postsRepository } from '../../repository/posts.repository';
import { createErrorMessages } from '../../../core/utils/error.utils';

export async function deletePostHandler(req: Request, res: Response) {
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

    await postsRepository.delete(req.params.id);

    res.sendStatus(HttpStatus.NoContent);
  } catch (error: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
