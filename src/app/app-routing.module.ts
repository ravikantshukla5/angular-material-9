import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { TweetComponent } from './tweet/tweet.component';
import { UsertableComponent } from './usertable/usertable.component';
import { ElasticComponent } from './elastic/elastic.component';

const routes: Routes = [
  { path: 'tweets', component: TweetComponent },
  { path: 'tweets/matD', component: UsertableComponent },
  { path: 'blogs/view', component: ElasticComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
