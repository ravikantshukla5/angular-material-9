import { Injectable }   from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Tweet } from '../models/tweet.model';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  private serviceUrl = '/api';

  constructor(private http: HttpClient) { }

  getTweet(): Observable<Tweet[]> {
    return this.http.get<Tweet[]>(this.serviceUrl+"/tweets/matD");
  }

  deleteTweetMat(id: string){
    return this.http.delete(this.serviceUrl + "/tweets/"+ id);
  }
getTweetNew() : Observable<Tweet[]> {
    return this.http.get<Tweet[]>(this.serviceUrl+"/tweets/matD");
  }

}
