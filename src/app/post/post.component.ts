import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { ToastrService } from 'ngx-toastr';
import { AppError } from '../common/error';
import { NotFoundError } from '../common/not-found-error';
import { BadInput } from '../common/bad-input';
import { AppErrorHandler } from "../common/app-error-handler";

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  posts:any[];
  
  constructor(private service:PostService, private toastr: ToastrService, private appErrorHandler: AppErrorHandler) {}

  ngOnInit() {
    this.service.getAll()
      .subscribe(posts => this.posts = posts);
  }

  async createPost(input: HTMLInputElement){
    let post = {title: input.value};
    this.posts.splice(0,0,post);

    input.value='';

    await this.sleep(2000);

    this.service.create(post)
      .subscribe(newPost=>{
        post['id']=newPost['id'];

        this.toastr.success('Post was created');

      }, 
      (error: AppError) => {
        this.posts.splice(0,1);
        this.toastr.error('The post could not be created.');

        if (error instanceof BadInput) {
          this.appErrorHandler.handleError('Post already exist');
          //this.form.setErrors(error.json());
        } else {
          throw error;
        }
      });
  }

  updatePost(post){
    this.service.update(post)
      .subscribe(updatePost=>{
        console.log(updatePost)
        this.toastr.success('Post was updated.')
      });
  }

  async deletePost(post){
    let index = this.posts.indexOf(post);
    this.posts.splice(index,1);

    await this.sleep(2000);

    this.service.delete(post.id)
      .subscribe(
        () =>{
          this.toastr.success('Post was deleted successfully.');
        }, 
        (error: AppError) => {
          this.posts.splice(index,0,post);

          this.toastr.error('The post could not be deleted.');

          if (error instanceof NotFoundError) {
            this.appErrorHandler.handleError('This post has already been deleted');
          } else {
            throw error;
          }
        });
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
