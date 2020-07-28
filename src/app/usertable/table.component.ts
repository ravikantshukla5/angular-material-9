import { Component,AfterViewInit,ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'

@Component({
selector: 'app-root',
templateUrl: './table.component.html',
styleUrls: ['./usertable.component.css']
})
export class TableComponent implements AfterViewInit{
displayedColumns = ['position', 'firstName', 'lastName', 'email'];
dataSource = new MatTableDataSource(ELEMENT_DATA);
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;
ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
rowClicked(row: any): void {
    console.log(row);
  }
}

export interface Element {
position: number;
firstName: string;
lastName: string;
email: string;
}

const ELEMENT_DATA: Element[] = [
{position: 1, firstName: 'John', lastName: 'Doe', email: 'john@gmail.com'},
{position: 1, firstName: 'Mike', lastName: 'Hussey', email: 'mike@gmail.com'},
{position: 1, firstName: 'Ricky', lastName: 'Hans', email: 'ricky@gmail.com'},
{position: 1, firstName: 'Martin', lastName: 'Kos', email: 'martin@gmail.com'},
{position: 1, firstName: 'Tom', lastName: 'Paisa', email: 'tom@gmail.com'}
];
