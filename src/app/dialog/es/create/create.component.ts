import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Blog } from 'src/app/models/blog.model';
import { ElasticService } from 'src/app/services/elastic.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  addBlogForm;
  res : Respns

  ngOnInit(): void {
    this.addBlogForm =  new FormGroup(
      {
        userId : new FormControl(""),
        postDate : new FormControl(""),
        postText : new FormControl(""),
        gender : new FormControl(""),
        hobby : new FormControl(""),
        occupation : new FormControl("")
      }
    )
  }

    constructor(
      public dialogRef: MatDialogRef<CreateComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Blog,private elasticService : ElasticService) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }

    createPost(blog: Blog) : void {
       this.elasticService.createBlog(blog).subscribe(
         data => {
        this.res = JSON.parse(JSON.stringify(data))
        if(this.res.status == 'CREATED'){
          this.dialogRef.close()
        }
         }
       );
    }
  }
  export interface Respns {
    status : string
  }
