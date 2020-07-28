import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { ElasticService } from '../services/elastic.service'
import { Blog } from '../models/blog.model';
import { Router } from '@angular/router';
import { merge, Observable, of as observableOf, from } from 'rxjs';
import { catchError, map, startWith, switchMap, tap } from 'rxjs/operators';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CreateComponent } from '../dialog/es/create/create.component';

@Component({
  selector: 'app-elastic',
  templateUrl: './elastic.component.html',
  styleUrls: ['./elastic.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ElasticComponent implements AfterViewInit {

  constructor(private elasticService: ElasticService,public dialog: MatDialog) { }

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  pageSize = 5;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  tableDatabase: TableDataSource | null;
  displayedColumns = ['userId', 'postText', 'postDate', 'action']
  blogs: Blog[] = [];
  blog: Blog;
  dataSource = new MatTableDataSource<Blog>(this.blogs);
  expandedElement: any | null;

  ngAfterViewInit() {
    this.tableDatabase = new TableDataSource(this.elasticService);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.tableDatabase.getBlogs(this.sort.active, this.sort.direction, this.paginator.pageIndex);
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
          this.blogs = data
          this.dataSource = new MatTableDataSource(this.blogs)
          this.dataSource.paginator = this.paginator;
        }
      );
  }

  ngOnInit(): void {
    this.elasticService.getBlogs()
      .subscribe(
        data => {
          this.blogs = data;
        }
      )
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateComponent, {
      width: '471px',
      disableClose: true,
      data: {post_text: "Ravi", post_date: "2020-07-27",user_id:1,
      blogSettings : {hobby : "chess",gender : "male", "occupation" : "CA"}}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  getBlog(id: string): Blog {

    this.elasticService.getBlog(id)
      .subscribe(
        data => {
          this.blog = data;
        }
      )
    return this.blog;
  }

}

export class TableDataSource {

  constructor(private elasticService: ElasticService) { }

  getBlogs(sort: string, order: string, page: number): Observable<Blog[]> {
    return this.elasticService.getBlogs().pipe(
      tap(results => {
        if (order == 'asc')
          results.sort(this.compareFn)
        else
          results.sort(this.compareFnRev)
      })
    )
  }
  compareFn = (a: Blog, b: Blog) => {
    if (a.post_text < b.post_text)
      return -1;
    if (a.post_text > b.post_text)
      return 1;
    return 0;
  };
  compareFnRev = (a: Blog, b: Blog) => {
    if (a.post_text < b.post_text)
      return 1;
    if (a.post_text > b.post_text)
      return -1;
    return 0;
  };
}
