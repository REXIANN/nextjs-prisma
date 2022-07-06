export interface User {
  id: number;
  name: string;
  email: string;
  phone?: number;
  posts: Post[];
}

export interface Post {
  id: number;
  title: string;
  published: boolean;
  author: User;
  authorId: number;
}