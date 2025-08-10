import { ObjectId, WithId } from 'mongodb';
import { postsRepository } from '../repository/posts.repository';
import { Post } from '../types/post';
import { PostQueryInput } from '../router/input/blog-query.input';
import { PostInputDto } from '../dto/post-input.dto';

export const postsService = {
  async findMany(
    id: string,
    queryDto: PostQueryInput,
  ): Promise<{ items: WithId<Post>[]; totalCount: number }> {
    return postsRepository.findMany(id, queryDto);
  },

  async create(
    dto: PostInputDto,
    blogId: ObjectId,
    blogName: string,
  ): Promise<WithId<Post>> {
    const newPost: Post = {
      title: dto.title,
      shortDescription: dto.shortDescription,
      content: dto.content,
      blogId,
      blogName,
      createdAt: new Date(),
    };

    return postsRepository.create(newPost);
  },
};
