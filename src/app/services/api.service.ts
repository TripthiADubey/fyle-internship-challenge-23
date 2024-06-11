import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://api.github.com';

  constructor(private httpClient: HttpClient) {}

  getUserRepos(username: string): Observable<any[]> {
    const url = `${this.baseUrl}/users/${username}/repos`;

    return this.httpClient.get<any[]>(url).pipe(
      map((response) =>
        response.map((repo) => ({
          ...repo,
          topics: repo.topics || [],
        }))
      ),
      catchError((error) => {
        console.error('Error fetching repositories', error);
        return throwError(error);
      })
    );
  }

  getUser(username: string): Observable<any> {
    const url = `${this.baseUrl}/users/${username}`;

    return this.httpClient.get<any>(url).pipe(
      map((response) => response),
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching user profile', error);
        return throwError(error);
      })
    );
  }
}
