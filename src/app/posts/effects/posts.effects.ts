import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
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
import { PostService } from '../services/post.service';

@Injectable()
export class PostsEffects {
  constructor(private actions$: Actions, private postsService: PostService) {}

  getPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPosts),
      exhaustMap(() =>
        this.postsService.getPosts().pipe(
          map((postsResponse) => {
            let pp: PostDTO[] = postsResponse;
            return getPostsSuccess({ posts: pp });
          }),
          catchError((err) => {
            return of(getPostsError({ payload: err }));
          })
        )
      )
    )
  );

  getPostsByUserID$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPostsByUserId),
      exhaustMap((res) =>
        this.postsService.getPostsByUserId(res.user_id).pipe(
          map((postsResponse) => {
            let pp: PostDTO[] = postsResponse;
            return getPostsByUserIdSuccess({ posts: pp });
          }),
          catchError((err) => {
            return of(getPostsByUserIdError({ payload: err }));
          })
        )
      )
    )
  );

  createPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createPost),
      exhaustMap((res) =>
        this.postsService.createPost(res.post).pipe(
          map((postsResponse) => {
            return createPostSuccess({ post: postsResponse });
          }),
          catchError((err) => {
            return of(createPostError({ payload: err }));
          })
        )
      )
    )
  );

  deletePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deletePost),
      exhaustMap((res) =>
        this.postsService.deletePost(res.post_id).pipe(
          map(() => {
            return deletePostSuccess({ post_id: res.post_id });
          }),
          catchError((err) => {
            return of(deletePostError({ payload: err }));
          })
        )
      )
    )
  );

  getPostById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPostById),
      exhaustMap((res) =>
        this.postsService.getPostById(res.post_id).pipe(
          map((post) => {
            return getPostByIdSuccess({ post: post });
          }),
          catchError((err) => of(getPostByIdError({ payload: err })))
        )
      )
    )
  );

  updatePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePost),
      exhaustMap((res) =>
        this.postsService.updatePost(res.post_id, res.post).pipe(
          map((post) => {
            console.log('RESPUESTA API', res.post_id);
            return updatePostSuccess({ post_id: post.postId, postUpd: post });
          }),
          catchError((err) => of(updatePostError({ payload: err })))
        )
      )
    )
  );

  likePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(likePost),
      exhaustMap((res) =>
        this.postsService.likePost(res.post_id).pipe(
          map((affectedRows) => {
            return likePostSuccess({
              post_id: res.post_id,
              affected_rows: affectedRows.affected,
            });
          })
        )
      )
    )
  );

  dislikePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(dislikePost),
      exhaustMap((res) =>
        this.postsService.dislikePost(res.post_id).pipe(
          map((affectedRows) => {
            return dislikePostSuccess({
              post_id: res.post_id,
              affected_rows: affectedRows.affected,
            });
          })
        )
      )
    )
  );
}
