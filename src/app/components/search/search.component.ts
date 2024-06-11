import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  username: string = '';
  repos: any[] = [];
  loading: boolean = false;
  initialLoad: boolean = true;
  userProfile: any = {};

  constructor(private githubService: ApiService) {}

  searchRepos() {
    this.repos = [];
    this.userProfile = {};
    this.loading = true;

    this.githubService
      .getUser(this.username)
      .subscribe((profile) => {
        this.userProfile = profile;
      })
      .add(() => {
        this.githubService.getUserRepos(this.username).subscribe((repos) => {
          this.initialLoad = false;
          this.loading = false;
          this.repos = repos;
        });
      });
  }
}
