import { Collection, Db, MongoClient } from 'mongodb';

import { SETTINGS } from '../core/settings/settings';
import { Blog } from '../1-blogs/types/blog';
import { Post } from '../2-posts/types/post';

const BLOG_COLLECTION_NAME = 'blogs';
const POST_COLLECTION_NAME = 'posts';

export let client: MongoClient;
export let blogCollection: Collection<Blog>;
export let postCollection: Collection<Post>;

// Подключения к бд
export async function runDB(url: string): Promise<void> {
  client = new MongoClient(url);
  const db: Db = client.db(SETTINGS.DB_NAME);

  // Инициализация коллекций
  blogCollection = db.collection<Blog>(BLOG_COLLECTION_NAME);
  postCollection = db.collection<Post>(POST_COLLECTION_NAME);

  try {
    await client.connect();
    await db.command({ ping: 1 });
    console.log('✅ Connected to the database');
  } catch (e) {
    await client.close();
    throw new Error(`❌ Database not connected: ${e}`);
  }
}

// для тестов
export async function stopDB() {
  if (!client) {
    throw new Error(`❌ No active client`);
  }
  await client.close();
}
