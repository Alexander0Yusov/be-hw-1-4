import { ObjectId, WithId } from 'mongodb';
import { PostInputDto } from '../dto/post-input.dto';
import { Post } from '../types/post';
import { postCollection } from '../../db/mongo.db';

export const postsRepository = {
  async findAll(): Promise<WithId<Post>[]> {
    return postCollection.find().toArray();
  },

  async findById(id: string): Promise<WithId<Post> | null> {
    return postCollection.findOne({ _id: new ObjectId(id) });
  },

  async create(post: Post): Promise<WithId<Post>> {
    const insertedResult = await postCollection.insertOne(post);

    return { ...post, _id: insertedResult.insertedId };
  },

  async update(id: string, dto: PostInputDto): Promise<void> {
    const updateResult = await postCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          title: dto.title,
          shortDescription: dto.shortDescription,
          content: dto.content,
          blogId: dto.blogId,
        },
      },
    );

    if (updateResult.matchedCount < 1) {
      throw new Error('Post not exist');
    }

    return;
  },

  async delete(id: string): Promise<void> {
    const deleteResult = await postCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (deleteResult.deletedCount < 1) {
      throw new Error('Blog not exist');
    }
  },
};
