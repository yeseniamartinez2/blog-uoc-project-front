import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { CategoryDTO } from 'src/app/categories/models/category.dto';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { SharedService } from 'src/app/Services/shared.service';
import { CategoryService } from '../../categories/services/category.service';
import { PostDTO } from '../models/post.dto';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnInit {
  post: PostDTO;
  title: FormControl;
  description: FormControl;
  num_likes!: FormControl;
  num_dislikes!: FormControl;
  publication_date: FormControl;
  categories!: FormControl;

  postForm: FormGroup;
  isValidForm: boolean | null;

  private isUpdateMode: boolean;
  private validRequest: boolean;
  private postId: string | null;

  categoriesList!: CategoryDTO[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private formBuilder: FormBuilder,
    private router: Router,
    private sharedService: SharedService,
    private localStorageService: LocalStorageService,
    private categoryService: CategoryService
  ) {
    this.isValidForm = null;
    this.postId = this.activatedRoute.snapshot.paramMap.get('id');
    this.post = new PostDTO('', '', 0, 0, new Date());
    this.isUpdateMode = false;
    this.validRequest = false;

    this.title = new FormControl(this.post.title, [
      Validators.required,
      Validators.maxLength(55),
    ]);

    this.description = new FormControl(this.post.description, [
      Validators.required,
      Validators.maxLength(255),
    ]);

    this.publication_date = new FormControl(
      formatDate(this.post.publication_date, 'yyyy-MM-dd', 'en'),
      [Validators.required]
    );

    this.categories = new FormControl([]);

    // get categories by user and load multi select
    this.loadCategories();

    this.postForm = this.formBuilder.group({
      title: this.title,
      description: this.description,
      publication_date: this.publication_date,
      categories: this.categories,
    });
  }

  private async loadCategories(): Promise<void> {
    let errorResponse: any;
    const userId = this.localStorageService.get('user_id');
    if (userId) {
      this.categoryService.getCategoriesByUserId(userId).subscribe(
        (categoriesResult) => {
          this.categoriesList = categoriesResult;
        },
        (e) => {
          errorResponse = e.error;
          this.sharedService.errorLog(errorResponse);
        }
      );
    }
  }

  async ngOnInit(): Promise<void> {
    let errorResponse: any;
    // update
    if (this.postId) {
      this.isUpdateMode = true;
      this.postService
        .getPostById(this.postId)
        .pipe(
          finalize(() => {
            this.title.setValue(this.post.title);

            this.description.setValue(this.post.description);

            this.publication_date.setValue(
              formatDate(this.post.publication_date, 'yyyy-MM-dd', 'en')
            );

            let categoriesIds: string[] = [];
            this.post.categories.forEach((cat: CategoryDTO) => {
              categoriesIds.push(cat.categoryId);
            });

            this.categories.setValue(categoriesIds);

            this.postForm = this.formBuilder.group({
              title: this.title,
              description: this.description,
              publication_date: this.publication_date,
              categories: this.categories,
            });
          })
        )
        .subscribe(
          (posts) => {
            this.post = posts;
          },
          (e) => {
            errorResponse = e.error;
            this.sharedService.errorLog(errorResponse);
          }
        );
    }
  }

  private async editPost(): Promise<boolean> {
    let errorResponse: any;
    let responseOK: boolean = false;
    if (this.postId) {
      const userId = this.localStorageService.get('user_id');
      if (userId) {
        this.post.userId = userId;
        this.postService
          .updatePost(this.postId, this.post)
          .pipe(
            finalize(async () => {
              await this.sharedService.managementToast(
                'postFeedback',
                responseOK,
                errorResponse
              );

              if (responseOK) {
                this.router.navigateByUrl('posts');
              }
            })
          )
          .subscribe(
            () => {
              responseOK = true;
            },
            (e) => {
              errorResponse = e.error;
              this.sharedService.errorLog(errorResponse);
            }
          );
      }
    }
    return responseOK;
  }

  private async createPost(): Promise<boolean> {
    let errorResponse: any;
    let responseOK: boolean = false;
    const userId = this.localStorageService.get('user_id');
    if (userId) {
      this.post.userId = userId;
      this.postService
        .createPost(this.post)
        .pipe(
          finalize(async () => {
            await this.sharedService.managementToast(
              'postFeedback',
              responseOK,
              errorResponse
            );

            if (responseOK) {
              // Reset the form
              //this.registerForm.reset();
              // After reset form we set birthDate to today again (is an example)
              //this.birth_date.setValue(formatDate(new Date(), 'yyyy-MM-dd', 'en'));
              this.router.navigateByUrl('posts');
            }
          })
        )
        .subscribe(
          () => {
            responseOK = true;
          },
          (errorRes) => {
            errorResponse = errorRes.error;
            this.sharedService.errorLog(errorResponse);
          }
        );
    }

    return responseOK;
  }

  async savePost() {
    this.isValidForm = false;

    if (this.postForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.post = this.postForm.value;

    if (this.isUpdateMode) {
      this.validRequest = await this.editPost();
    } else {
      this.validRequest = await this.createPost();
    }
  }
}
