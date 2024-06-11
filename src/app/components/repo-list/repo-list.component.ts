import { Component, Input, OnChanges } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.scss'],
})
export class RepoListComponent implements OnChanges {
  @Input() loading: boolean = false;
  repoListInitialized: Boolean = false;
  navigateToProfile(repo: any) {
    window.open(repo.svn_url, '_blank');
  }
  @Input() username: string = '';
  @Input() repoList: any[] = [];
  page: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  pageSizes: number[] = [10, 20, 50, 100]; 

  constructor(private githubService: ApiService) {}

  ngOnInit() {
    this.loading = true;
    this.loadRepos();
    this.totalItems = this.repoList.length;
    this.loading = false;
  }

  ngOnChanges() {
    this.loading = true;
    if (this.repoList.length > 0) {
      // Set to true when repoList is populated
      this.repoListInitialized = true;
      this.totalItems = this.repoList.length;
    }
    this.loading = false;
  }

  loadRepos() {
    this.githubService.getUserRepos(this.username).subscribe(
      (repos) => {
        this.repoList = repos;
      },
      (error) => {
        console.error('Error loading repositories', error);
      }
    );
  }

  changePageSize(event: any) {
    this.itemsPerPage = parseInt(event.target.value, 10);
    this.loadRepos();
  }
}
