import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/HttpStatus';
import { blogsRepository } from '../../repository/blogs.repository';
import { BlogInputDto } from '../../dto/blog-input.dto';
import { Blog } from '../../types/blog';
import { mapToBlogViewModel } from '../../mappers/map-to-blog-view-model.util';

export async function postBlogHandler(
  req: Request<{}, {}, BlogInputDto>,
  res: Response,
) {
  const newBlog: Blog = {
    name: req.body.name,
    description: req.body.description,
    websiteUrl: req.body.websiteUrl,
    createdAt: new Date(),
    isMembership: false,
  };

  try {
    const createdBlog = await blogsRepository.create(newBlog);
    const blogViewModel = mapToBlogViewModel(createdBlog);

    res.status(HttpStatus.Created).send(blogViewModel);
  } catch (error: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
