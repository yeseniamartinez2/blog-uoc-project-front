import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDTO } from '../models/user.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private urlBlogUocApi: string;
  private controller: string;

  constructor(private http: HttpClient) {
    this.controller = 'users';
    this.urlBlogUocApi = 'http://localhost:3000/' + this.controller;
  }

  register(user: UserDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>(this.urlBlogUocApi, user);
  }

  updateUser(userId: string, user: UserDTO): Observable<UserDTO> {
    return this.http
      .put<UserDTO>(this.urlBlogUocApi + '/' + userId, user);
  }

  getUSerById(userId: string): Observable<UserDTO> {
    return this.http
      .get<UserDTO>(this.urlBlogUocApi + '/' + userId);
  }
}
