import { createReducer, on } from '@ngrx/store';
import {
  createPost,
  createPostError,
  createPostSuccess,
  deletePost,
  deletePostError,
  deletePostSuccess,
  dislikePost,
  dislikePostSuccess,
  getPostById,
  getPostByIdError,
  getPostByIdSuccess,
  getPosts,
  getPostsByUserId,
  getPostsByUserIdError,
  getPostsByUserIdSuccess,
  getPostsError,
  getPostsSuccess,
  likePost,
  likePostSuccess,
  updatePost,
  updatePostError,
  updatePostSuccess,
} from '../actions';
import { PostDTO } from '../models/post.dto';

export interface PostState {
  posts: PostDTO[];
  loading: boolean;
  loaded: boolean;
  error: any;
  finalized: boolean;
  create?: boolean;
  update?: boolean;
}

export const initialState: PostState = {
  posts: ([] = []),
  loading: false,
  loaded: false,
  error: null,
  finalized: false,
  update: false,
  create: false,
};

const _postsReducer = createReducer(
  initialState,
  on(getPosts, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    finalized: false,
  })),
  on(getPostsSuccess, (state, { posts }) => ({
    ...state,
    loading: false,
    loaded: true,
    posts: posts.map((post) => {
      return {
        ...post,
      };
    }),
    finalized: false,
    create: false,
  })),
  on(getPostsError, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    finalized: true,
    error: {
      url: payload.url,
      status: payload.status,
      message: payload.message,
    },
  })),
  on(getPostsByUserId, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    finalized: false,
  })),
  on(getPostsByUserIdSuccess, (state, { posts }) => ({
    ...state,
    loading: false,
    loaded: true,
    posts: posts.map((post) => {
      return {
        ...post,
      };
    }),
    finalized: false,
  })),
  on(getPostsByUserIdError, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    finalized: false,
    error: {
      url: payload.url,
      status: payload.status,
      message: payload.message,
    },
  })),
  on(createPost, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    finalized: false,
  })),
  on(createPostSuccess, (state, { post }) => ({
    ...state,
    loading: false,
    loaded: true,
    posts: [
      ...state.posts,
      new PostDTO(
        post.title,
        post.description,
        post.num_likes,
        post.num_dislikes,
        post.publication_date
      ),
    ],
    finalized: true,
    create: true,
    update: false,
  })),
  on(createPostError, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    finalized: true,
    error: {
      url: payload.url,
      status: payload.status,
      message: payload.message,
    },
  })),
  on(deletePost, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    finalized: false,
    create: false,
    update: false,
  })),
  on(deletePostSuccess, (state, { post_id }) => ({
    ...state,
    loading: false,
    loaded: true,
    posts: [...state.posts.filter((post) => post.postId !== post_id)],
    finalized: true,
    create: true,
    update: false,
  })),
  on(deletePostError, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    finalized: true,
    error: {
      url: payload.url,
      status: payload.status,
      message: payload.message,
    },
  })),
  on(getPostById, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    finalized: false,
    create: false,
    update: false,
  })),
  on(getPostByIdSuccess, (state, { post }) => ({
    ...state,
    loading: false,
    loaded: true,
    posts: [post],
    error: null,
    create: false,
    update: false,
    finalized: true,
  })),
  on(getPostByIdError, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: {
      url: payload.url,
      status: payload.status,
      message: payload.message,
    },
    finalized: true,
  })),
  on(updatePost, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    create: false,
    update: true,
    finalized: false,
  })),
  on(updatePostSuccess, (state, { post_id, postUpd }) => ({
    ...state,
    loading: false,
    loaded: true,
    posts: [
      ...state.posts.map((post) => {
        if (post.postId === post_id) {
          return {
            ...post,
            postUpd,
          };
        } else {
          return post;
        }
      }),
    ],
    create: false,
    update: true,
    error: null,
    finalized: true,
  })),
  on(updatePostError, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    update: false,
    error: {
      url: payload.url,
      status: payload.status,
      message: payload.message,
    },
    finalized: true,
  })),
  on(likePost, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    update: false,
    finalized: false,
  })),
  on(likePostSuccess, (state, { post_id, affected_rows }) => ({
    ...state,
    loading: false,
    loaded: true,
    update: false,
    finalized: true,
    posts: [
      ...state.posts.map((post) => {
        if (affected_rows > 0 && post.postId === post_id) {
          return {
            ...post,
            num_likes: post.num_likes + 1,
          };
        } else {
          return post;
        }
      }),
    ],
  })),
  on(dislikePost, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    update: false,
    finalized: false,
  })),
  on(dislikePostSuccess, (state, { post_id, affected_rows }) => ({
    ...state,
    loading: false,
    loaded: true,
    finalized: true,
    update: false,
    posts: [
      ...state.posts.map((postRes) => {
        if (affected_rows > 0 && postRes.postId === post_id) {
          return {
            ...postRes,
            num_dislikes: postRes.num_dislikes + 1,
          };
        } else {
          return postRes;
        }
      }),
    ],
  }))
);

export function postsReducer(state: any, action: any) {
  return _postsReducer(state, action);
}
