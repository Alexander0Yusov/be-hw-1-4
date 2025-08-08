import { Request, Response } from 'express';

import { blogsRepository } from '../../repository/blogs.repository';
import { createErrorMessages } from '../../../core/utils/error.utils';
import { HttpStatus } from '../../../core/types/HttpStatus';
import { mapToBlogViewModel } from '../../mappers/map-to-blog-view-model.util';

export async function getBlogHandler(req: Request, res: Response) {
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

    res.status(HttpStatus.Ok).send(mapToBlogViewModel(blog));
  } catch (error: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
