import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { ApiService } from './api-service.service';
import { BlogService } from './blog.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, DatePipe, NgIf, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [DatePipe],
})
export class AppComponent implements OnInit {
  title = 'BlogManagement';
  today = new Date().toDateString();
  blogList: any[];//BlogService[] = [];
  newBlogShow: boolean = false;
  isDisabled: boolean = true;
  isButtonEditVisible: boolean = true;
  isButtonUpdateVisible: boolean = false;
  isButtonCancelVisible: boolean = false;
  blog: BlogService = {
    blogId: 0,
    username: 'Sanjay',
    dateCreated: new Date(),
    blogText: ''
  };
  constructor(private apiService: ApiService, private router: Router) {
    this.blogList = [];
  }


  blogHideShow(): void {
    console.log("2");
    this.newBlogShow = true;
  }

  ngOnInit() {
    this.getAllBlog();
  }
  Save(): void {
    const data = {
      blogId: this.blog.blogId,
      username: this.blog.username,
      dateCreated: this.blog.dateCreated,
      blogText: this.blog.blogText
    };
    this.apiService.addPost(data).subscribe((response) => {
      console.log(response);
      this.router.navigate([this.router.url])
    });
  }

  DeleteBlog(blogId: number): void {
    alert('Delete' + blogId);
    this.apiService.deletePost(blogId).subscribe(
      (response) => {
        console.log(response);
        this.getAllBlog();
      });
  }

  getAllBlog(): void {
    this.apiService.getPosts().subscribe(
      (response) => {
        console.log(response);
        this.blogList = response;
        this.isDisabled = true;
        this.isButtonEditVisible = true;
        this.isButtonUpdateVisible = false;
        this.isButtonCancelVisible = false;
      });
  }

  EditBlog(blogId: number): void {
    this.isDisabled = false;
    this.isButtonEditVisible = false;
    this.isButtonUpdateVisible = true;
    this.isButtonCancelVisible = true;
  }
  CancelBlog(blogId: number): void {
    this.isDisabled = true;
    this.isButtonEditVisible = true;
    this.isButtonUpdateVisible = false;
    this.isButtonCancelVisible = false;
  }

  UpdateBlog(blogId: number, blogText: string): void {
    alert(this.router.url);
    const data = {
      blogId: blogId,
      username: 'LoginUser',
      dateCreated: this.blog.dateCreated,
      blogText: blogText
    };
    this.apiService.updatePost(blogId, data).subscribe((response) => {
      //console.log(response);
      alert(this.router.url);
      this.blogList = response;
        this.isDisabled = true;
        this.isButtonEditVisible = true;
        this.isButtonUpdateVisible = false;
        this.isButtonCancelVisible = false;
        //this.getAllBlog();
        alert(this.router.url);
    });
    
    // this.CancelBlog(blogId);
    // this.router.navigate([this.router.url])
    // this.getAllBlog();
  }
}