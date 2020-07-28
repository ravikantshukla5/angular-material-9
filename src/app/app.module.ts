import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TweetComponent } from './tweet/tweet.component';
import {TweetService} from './tweet/tweet.service';
import {HttpClientModule} from "@angular/common/http";
import {CustomMaterialModule} from "./material/material.module";
import { UsertableComponent } from './usertable/usertable.component';
import {TableService} from './services/table.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ElasticComponent } from './elastic/elastic.component';
import { ElasticService } from './services/elastic.service';
import { MatDialogModule } from '@angular/material/dialog'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTableModule } from '@angular/material/table'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSortModule } from '@angular/material/sort'
import { MatSelectModule } from '@angular/material/select'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CreateComponent } from './dialog/es/create/create.component'

@NgModule({
  declarations: [
    AppComponent,
    TweetComponent,
    UsertableComponent,
    ElasticComponent,
    CreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CustomMaterialModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatSortModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  providers: [TweetService,TableService,ElasticService],
  bootstrap: [AppComponent]
})
export class AppModule { }
