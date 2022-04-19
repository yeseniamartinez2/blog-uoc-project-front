import { createAction, props } from '@ngrx/store';
import { PostDTO } from '../models/post.dto';

export const getPosts = createAction('[POST] Get posts');

export const getPostsSuccess = createAction(
  '[POST] Get posts success',
  props<{ posts: PostDTO[] }>()
);

export const getPostsError = createAction(
  '[POST] Get posts error',
  props<{ payload: any }>()
);

export const getPostsByUserId = createAction(
  '[POST] Get posts by user ID',
  props<{ user_id: string }>()
);

export const getPostsByUserIdSuccess = createAction(
  '[POST] Get posts by user ID success',
  props<{ posts: PostDTO[] }>()
);

export const getPostsByUserIdError = createAction(
  '[POST] Get posts by user ID error',
  props<{ payload: any }>()
);

export const createPost = createAction(
  '[POST] Create post',
  props<{ post: PostDTO }>()
);

export const createPostSuccess = createAction(
  '[POST] Create post success',
  props<{ post: PostDTO }>()
);

export const createPostError = createAction(
  '[POST] Create post error',
  props<{ payload: any }>()
);

export const deletePost = createAction(
  '[POST] Delete post',
  props<{ post_id: string }>()
);

export const deletePostSuccess = createAction(
  '[POST] Delete post success',
  props<{ post_id: string }>()
);

export const deletePostError = createAction(
  '[POST] Delete post error',
  props<{ payload: any }>()
);

export const getPostById = createAction(
  '[POST] Get post by ID',
  props<{ post_id: string }>()
);

export const getPostByIdSuccess = createAction(
  '[POST] Get post by ID success',
  props<{ post: PostDTO }>()
);

export const getPostByIdError = createAction(
  '[POST] Get post by ID error',
  props<{ payload: any }>()
);

export const updatePost = createAction(
  '[POST] Update post',
  props<{ post_id: string; post: PostDTO }>()
);

export const updatePostSuccess = createAction(
  '[POST] Update post success',
  props<{ post_id: string; postUpd: PostDTO }>()
);

export const updatePostError = createAction(
  '[POST] Update post error',
  props<{ payload: any }>()
);

export const likePost = createAction(
  '[POST] Like post',
  props<{ post_id: string }>()
);

export const likePostSuccess = createAction(
  '[POST] Like post success',
  props<{ post_id: string; affected_rows: number }>()
);

export const dislikePost = createAction(
  '[POST] Dislike post',
  props<{ post_id: string }>()
);

export const dislikePostSuccess = createAction(
  '[POST] Dislike post success',
  props<{ post_id: string; affected_rows: number }>()
);
