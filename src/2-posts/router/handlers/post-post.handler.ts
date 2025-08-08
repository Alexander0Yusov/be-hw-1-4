import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/HttpStatus';
import { postsRepository } from '../../repository/posts.repository';
import { PostInputDto } from '../../dto/post-input.dto';
import { Post } from '../../types/post';
import { mapToPostViewModel } from '../../mappers/map-to-blog-view-model.util';

export async function postPostHandler(
  req: Request<{}, {}, PostInputDto>,
  res: Response,
) {
  const newPost: Post = {
    title: req.body.title,
    shortDescription: req.body.shortDescription,
    content: req.body.content,
    blogId: req.body.blogId,
    blogName: '', // бурить в коллекцию блога
    createdAt: new Date(),
  };

  try {
    const createdPost = await postsRepository.create(newPost);
    const postViewModel = mapToPostViewModel(createdPost);

    res.status(HttpStatus.Created).send(postViewModel);
  } catch (error: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
