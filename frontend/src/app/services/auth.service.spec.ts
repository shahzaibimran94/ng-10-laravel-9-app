import { AuthService, AuthResponse } from './auth.service';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';

fdescribe('AuthService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: AuthService;
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    service = new AuthService(httpClientSpy);
  });

  it('should return expected login API response (HttpClient called once)', (done: DoneFn) => {
    expect(service.getFullName('Shahzaib', 'Imran')).toBe('Shahzaib Imran');
    const expectedResponse: AuthResponse = { status: true, message: 'LoggedIn Successfully', token: 'anyRandomeString123' };
    httpClientSpy.post.and.returnValue(of(expectedResponse));
    service.login({ email: 'test@example.com', password: 'password' })
    .subscribe({
      next: response => {
        expect(response)
          .withContext('expected response')
          .toEqual(expectedResponse);
        done();
      },
      error: done.fail
    });
    expect(httpClientSpy.post.calls.count())
    .withContext('one call')
    .toBe(1);
  });
});
