import { Request, Response } from 'express';
import { blogsRepository } from '../../repository/blogs.repository';
import { HttpStatus } from '../../../core/types/HttpStatus';
import { mapToBlogViewModel } from '../../mappers/map-to-blog-view-model.util';

export async function getBlogListHandler(req: Request, res: Response) {
  try {
    const blogs = await blogsRepository.findAll();
    const blogsViewModel = blogs.map(mapToBlogViewModel);
    res.status(HttpStatus.Ok).send(blogsViewModel);
  } catch (error: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
