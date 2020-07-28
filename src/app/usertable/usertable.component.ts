import { Component, OnInit,ViewChild,AfterViewInit,ChangeDetectorRef} from '@angular/core';
import { Router } from '@angular/router';
import { TableService} from '../services/table.service';
import 'rxjs/add/observable/of';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap, tap} from 'rxjs/operators';
import { Tweet } from '../models/tweet.model';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'usertable',
  templateUrl: './usertable.component.html',
  styleUrls: ['./usertable.component.css']
})
export class UsertableComponent implements AfterViewInit {
  displayedColumns = ['id','user','createdAt','userLocation','location','tweetText','hashtags','retweet','language','sentiment','action'];
  constructor(private router: Router,private tableService: TableService,private changeDetectorRefs: ChangeDetectorRef) {
   // setInterval(() => this.refresh(), 5000);
  }
  tableDatabase: TableDataSource | null;
  data: Tweet[] = [];
  dataSource = new MatTableDataSource<Tweet>(this.data);

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  pageSize = 30;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort ,{static:true}) sort: MatSort;

  ngAfterViewInit() {
    this.tableDatabase = new TableDataSource(this.tableService);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.tableDatabase.getTweets(this.sort.active, this.sort.direction, this.paginator.pageIndex);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.length;

          return data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(
        data => {
          this.data = data
          this.dataSource = new MatTableDataSource(this.data)
          this.dataSource.paginator = this.paginator;
        }
        );
  }

 deleteTweetMat(tweet: Tweet): void {
    alert("Are u sure to delete : "+tweet.id)
    this.tableService.deleteTweetMat(tweet.id)
    .subscribe((response) => {
     alert("deleted id : "+tweet.id);
      });
    this.refresh();
  }

 refresh() {
      this.tableDatabase.getTweets(this.sort.active, this.sort.direction, this.paginator.pageIndex).subscribe((res) => {
      this.data = res
      this.dataSource = new MatTableDataSource(this.data);
    });
  }

}
export class TableDataSource {
  
  constructor(private tableService: TableService) {}

  getTweets(sort: string, order: string, page: number): Observable<Tweet[]> {
     return this.tableService.getTweetNew().pipe(
       tap(results => {
         if(order == 'asc')
           results.sort(this.compareFn)
         else
          results.sort(this.compareFnRev)
        })
     )
  }
  compareFn = (a: Tweet, b : Tweet) => {
    if (a.userName < b.userName)
      return -1;
    if (a.userName > b.userName)
      return 1;
    return 0;
  };
  compareFnRev = (a: Tweet, b : Tweet) => {
    if (a.userName < b.userName)
      return 1;
    if (a.userName > b.userName)
      return -1;
    return 0;
  };
}
