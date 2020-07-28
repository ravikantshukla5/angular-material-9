import { Injectable }   from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import {Blog} from '../models/blog.model'
import { PromiseType } from 'protractor/built/plugins';
@Injectable(
   { providedIn: 'root'}
)
export class ElasticService {

    private serviceUrl = "/api"

    constructor(private http : HttpClient){}

    getBlogs(): Observable<Blog[]> {
      return this.http.get<Blog[]>(this.serviceUrl+"/blogs/view");
    }
  
    getBlog(id: string) : Observable<Blog>{
      return this.http.get<Blog>(this.serviceUrl + "/blogs/view"+ id);
    }

    createBlog(blog : Blog) {
      return this.http.post(this.serviceUrl + "/blogs/create",blog);
    }

}