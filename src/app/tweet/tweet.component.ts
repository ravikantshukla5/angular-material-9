import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Tweet } from '../models/tweet.model';
import { TweetService } from './tweet.service';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styles: []
})
export class TweetComponent implements OnInit {
  displayedColumns: string[] = ['id','user','createdAt','userLocation','location','tweetText','hashtags','retweet','language','sentiment'];
  tweets: Tweet[];
  //dataSource : MatTableDataSource<Tweet>;
  //@ViewChild(MatPaginator) paginator: MatPaginator;
  //@ViewChild(MatPaginatorModule, {static: true}) paginator: MatPaginatorModule;

  constructor(private router: Router, private tweetService: TweetService) {

  }

  ngOnInit() {
    this.tweetService.getTweets()
      .subscribe( data => {
        this.tweets = data;
       // this.dataSource = new MatTableDataSource<Tweet>(this.tweets);
       // this.dataSource.paginator = this.paginator;
      });
  };

  deleteTweet(tweet: Tweet): void {
    this.tweetService.deleteTweet(tweet)
      .subscribe( data => {
        this.tweets = this.tweets.filter(u => u !== tweet);
       // this.dataSource = new MatTableDataSource<Tweet>(this.tweets);
      })
  };
}
