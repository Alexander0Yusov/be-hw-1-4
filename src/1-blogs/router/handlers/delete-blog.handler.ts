import { Request, Response } from 'express';
import { blogsRepository } from '../../repository/blogs.repository';
import { HttpStatus } from '../../../core/types/HttpStatus';
import { createErrorMessages } from '../../../core/utils/error.utils';

export async function deleteBlogHandler(req: Request, res: Response) {
  try {
    const blog = await blogsRepository.findById(req.params.id);

    if (!blog) {
      res
        .status(HttpStatus.NotFound)
        .send(
          createErrorMessages([{ field: 'id', message: 'Blog not found' }]),
        );
      return;
    }

    await blogsRepository.delete(req.params.id);

    res.sendStatus(HttpStatus.NoContent);
  } catch (error: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
