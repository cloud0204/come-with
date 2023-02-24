export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface Post {
  commentCount: number;
  id: number;
  likes: number;
  slug: string;
  status: string;
  summary: string;
  tags: [{ slug: string }];
  thumbnail: string;
  title: string;
  topPriority: number;
  updateTime: number;
  visits: number;
}

export interface Comment {
  author: string;
  authorUrl?: string;
  content: string;
  email: string;
  postId: number;
  parentId?: number;
}
