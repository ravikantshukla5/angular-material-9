import {NgModule} from "@angular/core";
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTableModule } from '@angular/material/table'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'

@NgModule({
imports: [CommonModule, MatToolbarModule, MatButtonModule,MatTableModule,MatInputModule],
exports: [CommonModule, MatToolbarModule, MatButtonModule,MatTableModule,MatInputModule]
})
export class CustomMaterialModule { }
