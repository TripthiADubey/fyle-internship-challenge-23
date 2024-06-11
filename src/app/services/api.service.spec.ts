
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { of } from 'rxjs';

describe('API Service', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let apiService: ApiService;
  let mockUser = { name: 'Test User' };
  let mockRepo = [
    {
      name: 'test123',
      repo_url: 'test.vndvdzu.com',
    },
    {
      name: 'test456',
      repo_url: 'test.jcfnwynawxm.com',
    },
  ];

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    apiService = new ApiService(httpClientSpy);
  });

  describe('getUser()', () => {
    it('should return user profile', () => {
      

      httpClientSpy.get.and.returnValue(of(mockUser));

      apiService.getUser('testUsername').subscribe({
        next: (user) => {
          expect(user).toEqual(mockUser);
        },
        error: () => {},
      });

      expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    });
  });

  describe('getUserRepos()', () => {
    it('should return user\'s public repos', () => {
      httpClientSpy.get.and.returnValue(of(mockRepo));

      apiService.getUserRepos('testUsername').subscribe({
        next: (repo) => {
          expect(repo[0].name).toEqual('test123');
          expect(repo[1].name).toEqual('test456');
          expect(repo[0].repo_url).toEqual('test.vndvdzu.com');
          expect(repo[1].repo_url).toEqual('test.jcfnwynawxm.com');
        },
        error: () => {},
      });

      expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    });
  });
});
