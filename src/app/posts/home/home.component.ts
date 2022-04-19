import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { SharedService } from 'src/app/Services/shared.service';
import { HeaderMenus } from '../../auth/models/header-menus.dto';
import { HeaderMenusService } from '../../auth/services/header-menus.service';
import { PostDTO } from '../models/post.dto';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  posts!: PostDTO[];
  showButtons: boolean;
  constructor(
    private postService: PostService,
    private localStorageService: LocalStorageService,
    private sharedService: SharedService,
    private router: Router,
    private headerMenusService: HeaderMenusService
  ) {
    this.showButtons = false;
    this.loadPosts();
  }

  ngOnInit(): void {
    this.headerMenusService.headerManagement.subscribe(
      (headerInfo: HeaderMenus) => {
        if (headerInfo) {
          this.showButtons = headerInfo.showAuthSection;
        }
      }
    );
  }
  private async loadPosts(): Promise<void> {
    let errorResponse: any;
    const userId = this.localStorageService.get('user_id');
    if (userId) {
      this.showButtons = true;
    }
    this.postService.getPosts().subscribe(
      (posts) => {
        this.posts = posts;
      },
      (e) => {
        errorResponse = e.error;
        this.sharedService.errorLog(errorResponse);
      }
    );
  }

  async like(postId: string): Promise<void> {
    let errorResponse: any;
    this.postService.likePost(postId).subscribe(
      () => {
        this.loadPosts();
      },
      (e) => {
        errorResponse = e.error;
        this.sharedService.errorLog(errorResponse);
      }
    );
  }

  async dislike(postId: string): Promise<void> {
    let errorResponse: any;
    this.postService.dislikePost(postId).subscribe(
      () => {
        this.loadPosts();
      },
      (e) => {
        errorResponse = e.error;
        this.sharedService.errorLog(errorResponse);
      }
    );
  }
}
