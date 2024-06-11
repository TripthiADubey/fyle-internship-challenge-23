import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from  '@angular/common/http';
import { SearchComponent } from './components/search/search.component';
import { RepoListComponent } from './components/repo-list/repo-list.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ApiService } from './services/api.service';
@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    RepoListComponent,
    UserProfileComponent,
  ],
  imports: [BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule],
  providers: [ApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
