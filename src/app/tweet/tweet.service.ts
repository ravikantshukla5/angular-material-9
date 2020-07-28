import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Tweet } from '../models/tweet.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TweetService {

  constructor(private http:HttpClient) {}

  //private userUrl = 'http://localhost:8080/api';
	private userUrl = '/api';

  public getTweets() {
    return this.http.get<Tweet[]>(this.userUrl+"/tweets");
  }

  public deleteTweet(tweet) {
    return this.http.delete(this.userUrl + "/tweets/"+ tweet.id);
  }

  public createUser(tweet) {
    return this.http.post<Tweet>(this.userUrl+"/tweets/", tweet);
  }

}
