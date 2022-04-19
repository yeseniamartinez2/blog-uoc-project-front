import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [ProfileComponent, RegisterComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class UsersModule {}
