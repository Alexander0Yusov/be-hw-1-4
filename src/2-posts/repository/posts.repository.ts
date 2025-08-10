import { ObjectId, WithId } from 'mongodb';
import { PostInputDto } from '../dto/post-input.dto';
import { Post } from '../types/post';
import { postCollection } from '../../db/mongo.db';
import { PostQueryInput } from '../router/input/blog-query.input';

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
          blogId: new ObjectId(dto.blogId),
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

  async findMany(
    id: string,
    queryDto: PostQueryInput,
  ): Promise<{ items: WithId<Post>[]; totalCount: number }> {
    const {
      pageNumber,
      pageSize,
      sortBy,
      sortDirection,
      // searchNameTerm
    } = queryDto;

    const skip = (pageNumber - 1) * pageSize;
    const filter: any = {};

    // if (searchNameTerm) {
    //   filter.name = { $regex: searchNameTerm, $options: 'i' };
    // }

    filter.blogId = { $regex: id };

    const items = await postCollection
      .find(filter)
      .sort({ [sortBy]: sortDirection })
      .skip(skip)
      .limit(pageSize)
      .toArray();

    const totalCount = await postCollection.countDocuments(filter);

    return { items, totalCount };
  },
};
