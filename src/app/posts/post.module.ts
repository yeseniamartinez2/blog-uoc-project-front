import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { PostFormComponent } from './post-form/post-form.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { FormatDatePipe } from '../Pipes/format-date.pipe';
@NgModule({
  declarations: [PostsListComponent, PostFormComponent, HomeComponent, FormatDatePipe],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class PostsModule {}
