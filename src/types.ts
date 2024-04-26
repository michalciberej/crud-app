export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostsState {
  data: Post[];
  loading: boolean;
  error: string | null;
}
