import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import{BlogService} from './blog.service'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = 'http://localhost:5296';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/BlogManagement`);
  }

  getPostById(blogId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/BlogManagement/${blogId}`);
  }

  addPost(post: BlogService): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/BlogManagement`, post);
  }
 
  updatePost(blogId: number, post: BlogService): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/BlogManagement/${blogId}`, post);
  }

  deletePost(blogId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/BlogManagement/${blogId}`);
  }
}
