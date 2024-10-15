// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
export class BlogService {
  blogId: number;
  username: string;
  dateCreated: Date;
  blogText: string;
  constructor(Id: number, name: string, Created: Date, BText: string) {
    this.blogId = Id;
    this.username = name;
    this.dateCreated = Created;
    this.blogText = BText;
  }
}
